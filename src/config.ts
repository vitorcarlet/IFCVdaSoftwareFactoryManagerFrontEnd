import {
  ThemeMode,
  ThemeDirection,
  ThemeColorPresets,
  ThemeStretch,
  ThemeOpenSideBar,
  ThemeLayout,
} from "./components/settings/types";

export type SettingsValueProps = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
  themeStretch: ThemeStretch;
  themeOpenSideBar: ThemeOpenSideBar;
  themeLayout: ThemeLayout;
};

export const iconsRoutes = {
  calendar: "solar:calendar-date-bold",
  services: "solar:case-round-bold-duotone",
  dashboard: "solar:chart-bold-duotone",
  users: "solar:user-circle-bold-duotone",
  configurations: "solar:settings-bold-duotone",
  reports: "solar:file-text-bold-duotone",
  clients: "solar:users-group-two-rounded-bold-duotone",

  reportBug: "solar:bug-bold-duotone",
};

export const LOCAL_STORAGE = {
  LOCAL_STORAGE_KEY: "@IFCFactory:accessTokenConfig",
  LOCAL_STORAGE_SETTINGS: "@IFCFactory:settingsConfig",
  LOCAL_STORAGE_CALENDAR: "@IFCFactory:calendarConfig",
  LOCAL_STORAGE_LICENSE: "@IFCFactory:licenceConfig",
  LOCAL_STORAGE_I18NLANG: "@IFCFactory:i18nextLngConfig",
  LOCAL_STORAGE_SECURITY: "@IFCFactory:segurityConfig",
  LOCAL_STORAGE_PREVIOUS_PAGE: "@IFCFactory:previousPage",
  LOCAL_STORAGE_TOOLTIP_THEME: "@IFCFactory:tooltipTheme",
  LOCAL_STORAGE_DATAGRID: "@IFCFactory:dataGrid",
};

export const COOKIE_ACESS_TOKEN = "@IFCFactory:accessToken";

export const WHATSAPP_NUMBER = "5549123";

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

// LAYOUT
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const CHART = {
  RADIALBAR_HEIGHT: 392,
  RADIALBAR_LEGEND_HEIGHT: 72,
};

export const ICON = {
  NAVBAR_ITEM: 28,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

export const defaultSettings: SettingsValueProps = {
  themeMode: "light",
  themeDirection: "ltr",
  themeColorPresets: "blue",
  themeLayout: "horizontal",
  themeOpenSideBar: false,
  themeStretch: true,
};

export const paginationOptions = [25, 50, 100, 250];
