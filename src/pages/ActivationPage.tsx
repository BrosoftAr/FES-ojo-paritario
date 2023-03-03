import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import SignUpContainer from "../components/SignUpContainer";
import ApiEndpoints from "../shared/ApiEndpoints";
import AuthService from "../shared/AuthService";
import FetchService from "../shared/FetchService";
import RoutesEnum from "../shared/RoutesEnum";

interface ActivationPageRouteParams {
  id: string;
}

const ActivationPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const match = useRouteMatch<ActivationPageRouteParams>();
  const activationToken = match.params.id;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activate = async () => {
      try {
        setErrorMessage("");
        setIsLoading(true);
        const { token } = await FetchService.request(ApiEndpoints.ACTIVATE, {
          body: JSON.stringify({ activationToken }),
        });
        message.success("Cuenta activada correctamente.");

        AuthService.saveAuthToken(token);
        history.push(RoutesEnum.HOME);
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    activate();
  }, [activationToken]);

  return (
    <PageContainer showBackButton backRoute={RoutesEnum.LOGIN}>
      <SignUpContainer>
        <PageTitle>Activación de la cuenta</PageTitle>
        {!isLoading ? (
          <div>
            {errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <>
                <p>Su cuenta ha sido activada correctamente.</p>
              </>
            )}
          </div>
        ) : (
          <Spin />
        )}
      </SignUpContainer>
    </PageContainer>
  );
};
export default ActivationPage;
