import React from "react";
import styled from "styled-components/macro";
import colors from "../styles/colors";

interface ButtonProps {
  disabled?: boolean;
  light?: boolean;
  submit?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  light = false,
  submit = false,
  loading = false,
  onClick = () => {},
  style = {},
  ...props
}) => {
  return (
    <StyledButton
      disabled={disabled}
      light={light}
      onClick={onClick}
      style={style}
      type={submit ? "submit" : "button"}
      loading={loading}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

interface StyledButtonProps {
  light: boolean;
  disabled: boolean;
  loading: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  width: 100%;
  font-family: "Graphik";
  font-weight: 700;
  color: ${({ light }) => (light ? "#000" : "#fff")};
  background-color: ${({ light, disabled }) => {
    if (disabled) return "#ccc";
    if (light) return "#fff";
    return colors.primary;
  }};
  border: 1px solid #e9e9e9;
  border-radius: 13px;
  padding: 14px 15px 12px;
  box-shadow: 0px 1px 11px -3px rgba(0, 0, 0, 0.2);
`;

export default Button;
