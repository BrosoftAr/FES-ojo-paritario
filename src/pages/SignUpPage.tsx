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
import AuthService from "../shared/AuthService";

interface FormValues {
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async (formValues: FormValues) => {
    const closeLoading = message.loading("Registrando su usuario...");
    try {
      setIsSubmitting(true);

      const { token } = await FetchService.request(ApiEndpoints.SIGNUP, {
        body: JSON.stringify(formValues),
      });
      AuthService.saveAuthToken(token);
      closeLoading();
      history.push(RoutesEnum.SIGNUP_EMAIL_SENT);
    } catch (e) {
      message.error("Ha ocurrido un error al crear cuenta");
    } finally {
      setIsSubmitting(false);
      closeLoading();
    }
  };

  return (
    <PageContainer showBackButton>
      <SignUpContainer>
        <ContainerDiv>
          <Form onFinish={submit}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Ingresa tu email" }]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Ingresa tu contraseña" }]}
            >
              <Input placeholder="Contraseña" type="password" />
            </Form.Item>
            <Button submit disabled={isSubmitting}>
              Crear cuenta &gt;
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

export default SignUpPage;
