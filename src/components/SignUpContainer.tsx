import React from "react";
import styled from "styled-components/macro";
import LogoSrc from "../assets/img/logo.png";

const SignUpContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Header>
        <Logo src={LogoSrc} alt="Logo" />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const Header = styled.div`
  height: 25%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 46px;
`;
const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const Logo = styled.img`
  width: auto;
  height: 114px;
`;

export default SignUpContainer;
