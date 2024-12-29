type ThemeMode = "light" | "dark";
type ThemeDirection = "rtl" | "ltr";
type ThemeColorPresets = "default" | "purple" | "cyan" | "blue";
type ThemeLayout = "vertical" | "horizontal";
type ThemeStretch = boolean;
type ThemeOpenSideBar = boolean;

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type SettingsValueProps = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
  themeStretch: ThemeStretch;
  themeOpenSideBar: ThemeOpenSideBar;
  themeLayout: ThemeLayout;
};

type SettingsContextProps = SettingsValueProps & {
  isOpened: boolean;
  setColor: ColorVariants;
  colorOption: {
    name: string;
    value: string;
  }[];
  onToggleOpened: (opened?: boolean) => void;
  onToggleMode: VoidFunction;
  onToggleStretch: VoidFunction;
  onResetSetting: VoidFunction;
  onChangeOpenSideBar: (value?: boolean) => void;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
