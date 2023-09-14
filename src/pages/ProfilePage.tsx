import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";
import { Form, message, Spin } from "antd";
import Button from "../components/Button";
import Input from "../components/Input";
import PageTitle from "../components/PageTitle";
import ApiEndpoints from "../shared/ApiEndpoints";
import FetchService from "../shared/FetchService";
import { User } from "../shared/User";

interface ProfileFormValues {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  affiliateNumber: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);

    const { myUser } = await FetchService.request(
      ApiEndpoints.USERS_MY_DETAILS,
      {
        body: JSON.stringify({}),
      }
    );
    setUser(myUser);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [form] = Form.useForm();

  const [isSending, setIsSending] = useState(false);
  const saveForm = async (values: any) => {
    setIsSending(true);
    try {
      const formValues: ProfileFormValues = values;

      await FetchService.request(ApiEndpoints.USERS_UPDATE_PROFILE, {
        body: JSON.stringify({
          phone: formValues.phone,
          city: formValues.city,
          affiliateNumber: formValues.affiliateNumber,
        }),
      });

      form.resetFields();
      message.success("Perfil actualizado");
      fetchUser();
    } catch (e) {
      message.error(JSON.stringify(e));
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  let initialValues: ProfileFormValues | undefined = undefined;
  if (user) {
    initialValues = {
      name: user.workerProfile.name,
      lastname: user.workerProfile.lastName,
      email: user.email,
      phone: user.workerProfile.phone,
      city: user.workerProfile.city,
      affiliateNumber: user.workerProfile.affiliateNumber,
    };
  }

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Perfil</PageTitle>
        <Form initialValues={initialValues} onFinish={saveForm} form={form}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Ingresa tu nombre" }]}
            label="Nombre"
          >
            <Input small placeholder="Nombre" disabled />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Ingresa tu apellido" }]}
            label="Apellido"
          >
            <Input small placeholder="Apellido" disabled />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Ingresa tu email" }]}
            label="Email"
          >
            <Input small placeholder="Email" type="email" disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Ingrese teléfono" }]}
            label="Teléfono de contacto"
          >
            <Input small placeholder="Teléfono de contacto" type="number" />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[{ required: true, message: "Ingrese ciudad" }]}
            label="Ciudad"
          >
            <Input small placeholder="Ciudad" />
          </Form.Item>
          <Form.Item
            name="affiliateNumber"
            label="Nro Afiliado (si tienes uno)"
          >
            <Input small placeholder="Nro Afiliado (si tienes uno)" />
          </Form.Item>

          <Button submit disabled={isSending} loading={isSending}>
            Guardar
          </Button>
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};
export default ProfilePage;
