import React from "react";
import { Menu } from "antd";
import styled from "styled-components/macro";
import {
  HomeOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import RoutesEnum from "../shared/RoutesEnum";
import colors from "../styles/colors";

interface MainMenuProps {
  isVisible: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ isVisible }) => {
  const history = useHistory();
  const location = useLocation();

  const goTo = (route: string) => history.push(route);

  const getActiveKey = () => {
    let activeKey = "";

    if (location.pathname === RoutesEnum.HOME) {
      activeKey = RoutesEnum.HOME;
      return activeKey;
    }

    Object.values(RoutesEnum).forEach((route) => {
      if (location.pathname.includes(route)) {
        activeKey = route;
      }
    });

    return activeKey;
  };

  const activeKey = getActiveKey();
  console.log("activeKey", activeKey);

  return (
    <Container isVisible={isVisible}>
      <StyledMenu
        defaultOpenKeys={["sub1"]}
        mode="inline"
        selectedKeys={[activeKey]}
      >
        <Menu.Item
          key={RoutesEnum.HOME}
          icon={<HomeOutlined />}
          onClick={() => goTo(RoutesEnum.HOME)}
        >
          Inicio
        </Menu.Item>
        <Menu.Item
          key={RoutesEnum.NEWS}
          icon={<MessageOutlined />}
          onClick={() => goTo(RoutesEnum.NEWS)}
        >
          Noticias
        </Menu.Item>
        <Menu.Item
          key={RoutesEnum.INCIDENTS}
          icon={<WarningOutlined />}
          onClick={() => goTo(RoutesEnum.INCIDENTS)}
        >
          Incidentes
        </Menu.Item>
        <Menu.Item
          key={RoutesEnum.USEFUL_INFORMATION}
          icon={<InfoCircleOutlined />}
          onClick={() => goTo(RoutesEnum.USEFUL_INFORMATION)}
        >
          Información Útil
        </Menu.Item>
        <Menu.Item
          key={RoutesEnum.PROFILE}
          icon={<UserOutlined />}
          onClick={() => goTo(RoutesEnum.PROFILE)}
        >
          Perfil
        </Menu.Item>
        <Menu.Item
          key={"logout"}
          icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.removeItem("token");
            goTo(RoutesEnum.LOGIN);
          }}
        >
          Logout
        </Menu.Item>
      </StyledMenu>
    </Container>
  );
};

const Container = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(${(props) => (props.isVisible ? "0" : "-100%")});
  transition: transform 0.5s ease 0s;
  min-height: 100vh;
  background: ${colors.primary};
`;

const StyledMenu = styled(Menu)`
  width: 256px;
  background-color: transparent;
  color: #fff;
  font-size: 1.1em;
`;
export default MainMenu;
