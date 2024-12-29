import { LoginUser } from "@/contexts/JWTContext";

import { permissionsBase } from "@/utils/settings";

import { Locale } from "@/locales/i18n-config";

import { BusinessConfigs } from "@/types/shared/config";
import { RegisterUser } from "@/contexts/JWTContext";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AuthUserConfig = {
  notifications: {
    floating: boolean;
    sound: string;
  };
};

type User = {
  id: number;
  image: string;
  name: string;
  lastname: string;
  fullname: string;
  businessId: number;
  phone: string;
  phoneCode: string;
  isFinancial: boolean;
  email: string;
  permissions: string[];
  config: AuthUserConfig;
};

type AuthUser = null | User;

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  config: BusinessConfigs;
  readOnly: boolean;
};

type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  config: BusinessConfigs;
  method?: "jwt";
  lang?: Locale;
  readOnly: boolean;
  login: (props: LoginUser) => Promise<any>;
  register: (data: RegisterUser) => Promise<void>;
  logout: () => Promise<void>;
  setConfig: (config: BusinessConfigs) => void;
  updateUser: (user: Partial<AuthUser>) => void;
  havePermission?: (permission: string | string[]) => boolean;
  getAndHavePermission?: GetAndHavePermission;
  getMe: () => Promise<void>;
};

type AWSCognitoContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: "cognito";
  login: (props: LoginUser) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<unknown>;
  logout: VoidFunction;
};

type Auth0ContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: "auth0";
  login: () => Promise<void>;
  logout: VoidFunction;
};

type GlobalPermissionsKeys =
  | "calendar"
  | "configurations"
  | "users"
  | "meetings"
  | "reports"
  | "projects";

type SubPermissionKeys<T extends GlobalPermissionsKeys> =
  keyof typeof permissionsBase[T]["permissions"];

type GetPermissionValueArray = <
  A extends GlobalPermissionsKeys,
  B extends SubPermissionKeys<A>[]
>(
  group: A,
  key: B
) => string[];

type GetAndHavePermission = <
  A extends GlobalPermissionsKeys,
  B extends SubPermissionKeys<A>[]
>(
  group: A,
  key: B
) => boolean;

type GeneralPermissionsKeys = "projects" | "meetings" | "users";

type GeneralAndGlobalPermissionsKeys =
  | GlobalPermissionsKeys
  | GeneralPermissionsKeys;

type PermissionGeneral = {
  [key in GeneralAndGlobalPermissionsKeys]: string[];
};
