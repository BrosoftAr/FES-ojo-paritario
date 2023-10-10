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
import { useHistory } from "react-router-dom";
import RoutesEnum from "../shared/RoutesEnum";
import { Modal } from "antd";

interface ProfileFormValues {
  email: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { confirm } = Modal;

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

  const deleteAccount = async () => {
    message.loading("Eliminando cuenta de usuario...");
    try {
      setIsSending(true);
      await FetchService.request(ApiEndpoints.USERS_DELETE_ACCOUNT, {
        body: JSON.stringify({}),
      });
      form.resetFields();
      message.success("La cuenta ha sido eliminada exitosamente");
      localStorage.removeItem("token");
      history.push(RoutesEnum.LOGIN);
    } catch (e) {
      message.error(JSON.stringify(e));
    } finally {
      setIsSending(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "¿Estás seguro de eliminar la cuenta?",
      content: "La cuenta se eliminará de manera permanente",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteAccount();
      },
    });
  };

  if (isLoading) {
    return <Spin />;
  }

  let initialValues: ProfileFormValues | undefined = undefined;
  if (user) {
    initialValues = {
      email: user.email,
    };
  }

  return (
    <PageContainer showHeader>
      <ContentContainer>
        <PageTitle>Perfil</PageTitle>
        <Form initialValues={initialValues} form={form}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Ingresa tu email" }]}
            label="Email"
          >
            <Input small placeholder="Email" type="email" disabled />
          </Form.Item>
          <Button
            style={{ background: "#FF4141", marginTop: 15 }}
            onClick={() => showDeleteConfirm()}
            disabled={isSending}
            loading={isSending}
          >
            Eliminar cuenta
          </Button>
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};
export default ProfilePage;
