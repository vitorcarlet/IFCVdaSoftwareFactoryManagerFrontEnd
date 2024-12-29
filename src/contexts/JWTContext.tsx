'use client'

import { createContext, ReactNode, useCallback, useEffect, useReducer } from 'react'

import { setSession } from '@/utils/jwt'

import { ActionMap, AuthState, AuthUser, GetAndHavePermission, JWTContextType, User } from '@/types/shared/auth'

//import { Locale } from '@/locales/i18n-config'

import { BusinessConfigs } from '@/types/shared/config'
import axios from '@/utils/axios'
import { LOCAL_STORAGE } from '@/config'
import { getPermissionValues } from '@/types/shared/settings'
import { useRouter } from 'next/navigation'

enum Types {
    Initial = 'INITIALIZE',
    Update = 'UPDATE',
    Login = 'LOGIN',
    SetConfig = 'SETCONFIG',
    Logout = 'LOGOUT',
    Register = 'REGISTER'
}

export type LoginUser = {
    // phoneNumber: string
    // phoneCode: string | number
    username: string
    password: string
    //remember: boolean
}

export type RegisterUser = {
    nome: string
    username: string
    password: string
    role: string
    isActive: boolean
    email: string
    telefone: string
    numeroMatricula: string
}

export interface ApiResponse {
    api_token: string
    success: boolean
    message: string
    items: User
}

type JWTAuthPayload = {
    [Types.Initial]: {
        readOnly: boolean
        isAuthenticated: boolean
        user: AuthUser
        config: BusinessConfigs
    }
    [Types.Login]: {
        user: AuthUser
        config: BusinessConfigs
        readOnly: boolean
    }
    [Types.SetConfig]: {
        config: BusinessConfigs
    }
    [Types.Logout]: undefined
    [Types.Register]: {
        user: AuthUser
    }
    [Types.Update]: Partial<AuthUser>
}

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>]

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    config: {} as BusinessConfigs,
    readOnly: false
}

type JWTReducerFnc = (state: AuthState, action: JWTActions) => AuthState

const JWTReducer: JWTReducerFnc = (state: AuthState, action: JWTActions) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
                config: action.payload.config,
                readOnly: action.payload.readOnly
            }
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                config: action.payload.config,
                readOnly: action.payload.readOnly
            }
        case 'SETCONFIG':
            return {
                ...state,
                config: action.payload.config
            }
        case 'LOGOUT':
            return {
                ...state,
                readOnly: false,
                isAuthenticated: false,
                user: null,
                config: {} as BusinessConfigs
            }
        case 'UPDATE':
            return {
                ...state,
                user: { ...state.user, ...action.payload } as User
            }

        case 'REGISTER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            }

        default:
            return state
    }
}

const AuthContext = createContext<JWTContextType | null>(null)

type AuthProviderProps = {
    children: ReactNode
    //lang: Locale
}

function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer<JWTReducerFnc, AuthState>(JWTReducer, initialState, arg => arg)
    const date = new Date()
    const { replace } = useRouter()

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = localStorage.getItem(LOCAL_STORAGE.LOCAL_STORAGE_KEY)

                if (!accessToken) {
                    throw new Error('No Token')
                }

                console.log('vai chamar o setSession', accessToken)
                setSession(accessToken)

                const { data } = await axios.get('/api/Auth/me')

                if (data.username) {
                    localStorage.setItem(
                        LOCAL_STORAGE.LOCAL_STORAGE_LICENSE,
                        JSON.stringify({
                            message: data.username,
                            role: data.role,
                            dateNow: date.getDate()
                        })
                    )
                } else {
                    localStorage.removeItem(LOCAL_STORAGE.LOCAL_STORAGE_LICENSE)
                }

                // dispatch({
                //     type: Types.Initial,
                //     payload: {
                //         isAuthenticated: true,
                //         user: data.items,
                //         config: data.config ?? {},
                //         readOnly: data.readOnly
                //     }
                // })
            } catch (err) {
                // dispatch({
                //     type: Types.Initial,
                //     payload: {
                //         readOnly: false,
                //         isAuthenticated: false,
                //         user: null,
                //         config: {} as BusinessConfigs
                //     }
                // })
            }
        }

        initialize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = async ({ ...values }: LoginUser) => {
        const post = { ...values }
        const { data } = (await axios.post('/api/Auth/login', post)) || {}

        console.log(data, 'data')
        if (data?.token) setSession(data.token)

        // if (data?.items) {
        //     dispatch({
        //         type: Types.Login,
        //         payload: {
        //             user: data.items,
        //             config: data.config ?? {},
        //             readOnly: data.readOnly
        //         }
        //     })
        // }

        return data
    }

    const getMe = async () => {
        const { data } = await axios.get('/api/Auth/me')

        if (data.username) {
            localStorage.setItem(
                LOCAL_STORAGE.LOCAL_STORAGE_LICENSE,
                JSON.stringify({
                    message: data.username,
                    role: data.role,
                    dateNow: date.getDate()
                })
            )
        } else {
            localStorage.removeItem(LOCAL_STORAGE.LOCAL_STORAGE_LICENSE)
        }

        dispatch({
            type: Types.Update,
            payload: data.items
        })

        return data
    }

    const register = async ({ ...values }: RegisterUser) => {
        const data = values
        await axios.post('/api/account/register', data)
    }

    const logout = async () => {
        const response = await axios.post('/api/Auth/logout')
        if (response.status === 200) {
            setSession(null)
            dispatch({ type: Types.Logout })
            localStorage.removeItem(LOCAL_STORAGE.LOCAL_STORAGE_LICENSE)
            replace('/login')
        }
    }

    const updateUser = async (payload: Partial<AuthUser>) => {
        dispatch({ type: Types.Update, payload })
    }

    const setConfig = useCallback((config: BusinessConfigs) => {
        dispatch({
            type: Types.SetConfig,
            payload: {
                config
            }
        })
    }, [])

    const havePermission = useCallback(
        (permission: string) => {
            const { permissions } = state.user || {}
            if (!permissions?.length) return false

            const permArr = !Array.isArray(permission) ? [permission] : permission

            return !!permArr.filter(perm => permissions.includes(perm)).length
        },
        [state.user]
    )

    // const getAndHavePermission: GetAndHavePermission = useCallback(
    //     (group: any, key: any) => {
    //         const permValues = getPermissionValues(group, key)
    //         return havePermission(permValues)
    //     },
    //     [havePermission]
    // )

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                //lang,
                login,
                logout,
                register,
                updateUser,
                setConfig,
                getMe
                //havePermission
                //getAndHavePermission
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
