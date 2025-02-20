const RoutesEnum = {
  LOGIN: "/",
  SIGNUP: "/signup",
  SIGNUP_EMAIL_SENT: "/signup-email-sent",
  FORGOT_PASSWORD: "/forgot-password",
  FORGOT_PASSWORD_EMAIL_SENT: "/forgot-password-email-sent",
  HOME: "/home",
  INTERNATIONAL_NEWS: "/international-news",
  NEWS: "/news",
  NATIONAL_NEWS: "/national-news",
  NEWS_ARTICLE: "/news/:id",
  INCIDENTS: "/incidents",
  INCIDENTS_NEW: "/incidents/new",
  INCIDENTS_VIEW: "/incidents/detail/:id",
  USEFUL_INFORMATION: "/useful-info",
  USEFUL_INFORMATION_VIEW: "/useful-info/:id",
  ACTIVATION: "/auth/verify/:id",
  RESET: "/auth/reset/:id",
};
export default RoutesEnum;
