import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import MainMenu from "./MainMenu";
import { MenuOutlined, LeftOutlined } from "@ant-design/icons";

import LogoSrc from "../assets/img/logo-horizontal.png";
import MenuIconSrc from "../assets/icons/menu-icon.png";

interface PageContainerProps {
  showBackButton?: boolean;
  showHeader?: boolean;
  title?: string | null;
  backRoute?: string | undefined;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  showBackButton = false,
  showHeader = false,
  title = null,
  backRoute = undefined,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const history = useHistory();

  return (
    <>
      <Container isMenuVisible={isMenuVisible}>
        {showBackButton && history.length && (
          <BackButton
            onClick={() =>
              backRoute ? history.push(backRoute) : history.goBack()
            }
          >
            <LeftOutlined style={{ fontSize: 28 }} />
          </BackButton>
        )}
        {showHeader && (
          <HeaderContainer>
            {!showBackButton ? (
              <MenuToggleIcon onClick={() => setIsMenuVisible(!isMenuVisible)}>
                <MenuIcon src={MenuIconSrc}></MenuIcon>
              </MenuToggleIcon>
            ) : (
              <div>a</div>
            )}
            <HeaderTitle>{title}</HeaderTitle>
            <LogoContainer>
              <Logo src={LogoSrc} alt="Logo" />
            </LogoContainer>
          </HeaderContainer>
        )}

        {children}
      </Container>
      <MainMenu isVisible={isMenuVisible} />
    </>
  );
};

const Container = styled.div<{ isMenuVisible: boolean }>`
  width: 100%;
  min-height: 100vh;
  background-color: #f9faff;
  position: relative;
  transform: translateX(${(props) => (props.isMenuVisible ? "258px" : 0)});
  transition: transform 0.5s ease 0s;
`;

const BackButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 40px;
`;

const HeaderContainer = styled.div`
  background: #fff;
  box-shadow: 0px 1px 11px -3px rgba(0, 0, 0, 0.2);
  padding: 24px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: auto;
  height: 21px;
`;

const MenuIcon = styled.img`
  width: 25px;
  height: auto;
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;
const MenuToggleIcon = styled.div`
  font-size: 20px;
`;
const LogoContainer = styled.div``;

export default PageContainer;
