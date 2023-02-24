import React from "react";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RoutesEnum from "./shared/RoutesEnum";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ForgotPasswordEmailSentPage from "./pages/ForgotPasswordEmailSentPage";
import "./styles/App.scss";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NationalNewsPage from "./pages/NationalNewsPage";
import InternationalNewsPage from "./pages/InternationalNewsPage";
import "antd/dist/antd.css";
import NewsArticlePage from "./pages/NewsArticlePage";
import IncidentsPage from "./pages/IncidentsPage";
import NewIncidentPage from "./pages/NewIncidentPage/NewIncidentPage";
import UsefulInformationPage from "./pages/UsefulInformationPage";
import UsefulInfoDetailPage from "./pages/UsefulInfoDetailPage";
import LoggedInRoute from "./components/LoggedInRoute";
import ViewIncidentsPage from "./pages/ViewIncidentPage";
import SignUpEmailSentPage from "./pages/SignUpEmailSentPage";
import ActivationPage from "./pages/ActivationPage";
import ResetPage from "./pages/ResetPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={RoutesEnum.LOGIN} component={LoginPage} />
        <Route exact path={RoutesEnum.SIGNUP} component={SignUpPage} />
        <Route
          exact
          path={RoutesEnum.FORGOT_PASSWORD}
          component={ForgotPasswordPage}
        />
        <Route
          exact
          path={RoutesEnum.SIGNUP_EMAIL_SENT}
          component={SignUpEmailSentPage}
        />
        <Route
          exact
          path={RoutesEnum.FORGOT_PASSWORD_EMAIL_SENT}
          component={ForgotPasswordEmailSentPage}
        />
        <Route
          exact
          path={RoutesEnum.ACTIVATION}
          component={ActivationPage}
        />
        <Route
          exact
          path={RoutesEnum.RESET}
          component={ResetPage}
        />
        <LoggedInRoute 
          exact
          path={RoutesEnum.HOME}
          component={HomePage}
        />
        <LoggedInRoute 
          exact
          path={RoutesEnum.NATIONAL_NEWS}
          component={NationalNewsPage}
        />
        <LoggedInRoute 
          exact
          path={RoutesEnum.INTERNATIONAL_NEWS}
          component={InternationalNewsPage}
        />
        <LoggedInRoute
          exact
          path={RoutesEnum.NEWS_ARTICLE}
          component={NewsArticlePage}
        />
        <LoggedInRoute
          exact
          path={RoutesEnum.INCIDENTS}
          component={IncidentsPage}
        />
        <LoggedInRoute
          exact
          path={RoutesEnum.INCIDENTS_NEW}
          component={NewIncidentPage}
        />
        <LoggedInRoute
          exact
          path={RoutesEnum.INCIDENTS_VIEW}
          component={ViewIncidentsPage}
        />
        <LoggedInRoute
          exact
          path={RoutesEnum.USEFUL_INFORMATION}
          component={UsefulInformationPage}
        />
        <LoggedInRoute
          exact
          path={RoutesEnum.USEFUL_INFORMATION_VIEW}
          component={UsefulInfoDetailPage}
        />
      </Switch>
    </Router>
  );
}

export default App;
