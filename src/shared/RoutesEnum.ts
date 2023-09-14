const RoutesEnum = {
  LOGIN: "/",
  SIGNUP: "/signup",
  SIGNUP_EMAIL_SENT: "/signup-email-sent",
  FORGOT_PASSWORD: "/forgot-password",
  FORGOT_PASSWORD_EMAIL_SENT: "/forgot-password-email-sent",
  HOME: "/home",
  NEWS: "/news",
  NEWS_ARTICLE: "/news/:id",
  PROFILE: "/profile",
  INCIDENTS: "/incidents",
  INCIDENTS_NEW: "/incidents/new",
  INCIDENTS_VIEW: "/incidents/detail/:id",
  USEFUL_INFORMATION: "/useful-info",
  USEFUL_INFORMATION_VIEW: "/useful-info/:id",
  ACTIVATION: "/auth/verify/:id",
  RESET: "/auth/reset/:id",
};
export default RoutesEnum;
