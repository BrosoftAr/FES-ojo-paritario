import React, { useState } from "react";
import { Form, message } from "antd";
import styled from "styled-components/macro";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import SignUpContainer from "../components/SignUpContainer";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import RoutesEnum from "../shared/RoutesEnum";
import FetchService from "../shared/FetchService";
import ApiEndpoints from "../shared/ApiEndpoints";

const ForgotPasswordPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async ({ email }: { email: string }) => {
    const closeLoading = message.loading("Procesando...");
    try {
      setIsSubmitting(true);

      await FetchService.request(ApiEndpoints.USERS_FORGOT_PASSWORD, {
        body: JSON.stringify({
          email,
        }),
      });

      history.push(RoutesEnum.FORGOT_PASSWORD_EMAIL_SENT);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
      closeLoading();
    }
  };

  return (
    <PageContainer showBackButton>
      <SignUpContainer>
        <ContainerDiv>
          <h1>Olvidé mi contraseña</h1>
          <Form onFinish={submit}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Ingresa tu email" }]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Button submit loading={isSubmitting}>
              Resetear Contraseña &gt;
            </Button>
          </Form>
        </ContainerDiv>
      </SignUpContainer>
    </PageContainer>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
`;

export default ForgotPasswordPage;
