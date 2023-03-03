import { Button, Input, message, Form } from "antd";
import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import SignUpContainer from "../components/SignUpContainer";
import ApiEndpoints from "../shared/ApiEndpoints";
import AuthService from "../shared/AuthService";
import FetchService from "../shared/FetchService";
import RoutesEnum from "../shared/RoutesEnum";

interface ResetPageRouteParams {
  id: string;
}

const ResetPage = () => {
  const history = useHistory();
  const match = useRouteMatch<ResetPageRouteParams>();
  const activationToken = match.params.id;

  const [isLoading, setIsLoading] = useState(false);

  const submit = async ({ password }: { password: string }) => {
    try {
      setIsLoading(true);
      const { token } = await FetchService.request(
        ApiEndpoints.USERS_RESET_PASSWORD,
        {
          body: JSON.stringify({ activationToken, password }),
        }
      );
      message.success("Contraseña cambiada correctamente.");

      AuthService.saveAuthToken(token);
      history.push(RoutesEnum.HOME);
    } catch (e) {
      message.error(e.message, 5);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer showBackButton backRoute={RoutesEnum.LOGIN}>
      <SignUpContainer>
        <PageTitle>Reseteo de contraseña</PageTitle>

        <Form onFinish={submit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Ingresa tu nueva contraseña" }]}
          >
            <Input placeholder="Nueva contraseña" type="password" />
          </Form.Item>

          <Button htmlType="submit" disabled={isLoading} loading={isLoading}>
            Guardar
          </Button>
        </Form>
      </SignUpContainer>
    </PageContainer>
  );
};
export default ResetPage;
