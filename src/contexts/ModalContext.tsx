'use client'
import { Iconify } from '@/components/iconify/iconify'
import { IconifyIcon } from '@iconify/react'
import { Breakpoint, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { createContext, ReactNode, useCallback, useReducer } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type ModalGlobalProviderProps = {
    children: ReactNode
}

interface ModalGlobalContextOpen {
    title?: string
    closeOnSubmit?: boolean
    isSecondary?: boolean
    fields?: []
    titleIcon?: string | IconifyIcon
    verticalAlign?: 'middle' | 'center' | 'top'
    size?: Breakpoint
    customRender: () => React.ReactNode
}

export interface ModalGlobalProviderStates extends ModalGlobalContextOpen {
    Id?: number
    isOpened: boolean
    verticalAlign?: 'middle' | 'center' | 'top'
    open: (options?: ModalGlobalContextOpen) => void
    edit: handleEditFunction
    close: VoidFunction
    index?: number | null
    currentItem: any
    methods?: UseFormReturn<FieldValues, any>
    scroll: 'body' | 'paper'
}

const ModalGlobalContext = createContext<ModalGlobalProviderStates>({} as ModalGlobalProviderStates)

const initialState: ModalGlobalProviderStates = {
    Id: 0,
    isOpened: false,
    index: null,
    closeOnSubmit: true,
    verticalAlign: 'middle',
    title: '',
    size: 'sm',
    scroll: 'body',
    customRender: () => null,
    currentItem: null,
    open: () => {},
    edit: () => {},
    close: () => {}
}

type handleEditFunction = <T>(Id: number, options?: ModalGlobalContextOpen & { currentItem?: T }) => void

type ModalGlobalAction =
    | { type: 'OPEN'; payload: Partial<ModalGlobalProviderStates> }
    | { type: 'CLOSE' }
    | { type: 'EDIT'; payload: { Id: number } & Partial<ModalGlobalProviderStates> }

const modalReducer = (state: ModalGlobalProviderStates, action: ModalGlobalAction): ModalGlobalProviderStates => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, ...action.payload, isOpened: true }
        case 'CLOSE':
            return { ...initialState }
        case 'EDIT':
            return { ...state, ...action.payload, isOpened: true }
        default:
            return state
    }
}

const ModalGlobalProvider = ({ children }: ModalGlobalProviderProps) => {
    const [state, dispatch] = useReducer(modalReducer, initialState)
    const [stateSec, dispatchSec] = useReducer(modalReducer, initialState)

    const handleOpen = useCallback((options?: ModalGlobalContextOpen) => {
        const { isSecondary, ...opt } = options || {}
        if (isSecondary) {
            dispatchSec({ type: 'OPEN', payload: opt })
        } else {
            dispatch({ type: 'OPEN', payload: opt })
        }
    }, [])

    const handleEdit: handleEditFunction = useCallback((Id, options) => {
        dispatch({ type: 'EDIT', payload: { Id, ...options } })
    }, [])

    const handleClose = () => {
        if (stateSec.isOpened) {
            dispatchSec({ type: 'CLOSE' })
        } else {
            dispatch({ type: 'CLOSE' })
        }
    }

    return (
        <ModalGlobalContext.Provider
            value={{
                ...state,
                open: handleOpen,
                edit: handleEdit,
                close: handleClose
            }}
        >
            {children}

            <ModalComponent {...state} handleClose={handleClose} />

            <ModalComponent {...stateSec} handleClose={handleClose} />
        </ModalGlobalContext.Provider>
    )
}

export { ModalGlobalProvider, ModalGlobalContext }

interface ModalComponentProps
    extends Pick<
        ModalGlobalProviderStates,
        'size' | 'scroll' | 'verticalAlign' | 'isOpened' | 'title' | 'titleIcon' | 'customRender'
    > {
    handleClose: VoidFunction
}

const ModalComponent = ({ size, scroll, verticalAlign, ...other }: ModalComponentProps) => {
    const closeButton = (
        <IconButton size="large" onClick={other.handleClose} sx={{ position: 'absolute', right: 20 }}>
            <Iconify icon="ep:close-bold" size={2.2} color="text.secondary" />
        </IconButton>
    )

    return (
        <Dialog
            keepMounted={false}
            maxWidth={size}
            fullWidth
            PaperProps={{
                sx: { verticalAlign }
            }}
            scroll={scroll}
            open={other.isOpened}
            onClose={other.handleClose}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                {other.title && (
                    <>
                        {other.titleIcon && <Iconify icon={other.titleIcon} size={3} mr={1} />}
                        {other.title}
                    </>
                )}
                {closeButton}
            </DialogTitle>
            <DialogContent sx={{ py: 0, minHeight: 100 }}>{other.customRender?.()}</DialogContent>
        </Dialog>
    )
}
