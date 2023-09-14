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
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  affiliateNumber?: number;
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
          <Form onFinish={submit} className="form--small">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Ingresa tu nombre" }]}
            >
              <Input small placeholder="Nombre" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Ingresa tu apellido" }]}
            >
              <Input small placeholder="Apellido" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Ingresa tu email" }]}
            >
              <Input small placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Ingresa tu contraseña" }]}
            >
              <Input small placeholder="Contraseña" type="password" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Ingrese teléfono" }]}
            >
              <Input small placeholder="Teléfono de contacto" type="number" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Ingrese ciudad" }]}
            >
              <Input small placeholder="Ciudad" />
            </Form.Item>
            <Form.Item name="affiliateNumber">
              <Input small placeholder="Nro Afiliado (si tienes uno)" />
            </Form.Item>
            <Button submit disabled={isSubmitting}>
              Afiliarme &gt;
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

const BottomLinks = styled.div``;

const PageLink = styled.a``;

export default SignUpPage;
