const path = (root: string, sublink: string) => {
  return `/${root}${sublink}`;
};

const ROOTS_AUTH = "auth";

const ROOTS_DASHBOARD = `dashboard`;

const ROOTS_SYSTEM = `system`;

export const ENDPOINTS_BACKEND = {
  start: {
    get: {
      root: (serviceOrdersId: string) => `start/${serviceOrdersId}`,
    },
    monitoring: {
      root: (serviceOrdersId: string) =>
        `/start/${serviceOrdersId}/view/monitoring`,
    },
  },
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  register: path(ROOTS_AUTH, "/register"),
  verify: path(ROOTS_AUTH, "/verify"),
  login: path(ROOTS_AUTH, "/login"),
  logout: path(ROOTS_DASHBOARD, "/logout"),
  confirmationMethods: path(ROOTS_AUTH, "/confirmation-method"),
  changePassword: path(ROOTS_AUTH, "/change-password"),
};

export const PATH_PAGE = {
  account: "/account",
  maintenance: "/maintenance",
  comingSoon: "/coming-soon",
  components: "/components",
  contact: "/contact-us",
  payment: "/payment",
  privacy: "/privacy",
  about: "/about-us",
  page404: "/404",
  page500: "/500",
  faqs: "/faqs",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    dashbord: path(ROOTS_DASHBOARD, "/app"),
    analytics: path(ROOTS_DASHBOARD, "/analytics"),
  },
};

export const PATH_SYSTEM = {
  root: ROOTS_SYSTEM,
  general: {
    dashbord: path(ROOTS_SYSTEM, "/app"),
    analytics: path(ROOTS_SYSTEM, "/analytics"),
  },
};
