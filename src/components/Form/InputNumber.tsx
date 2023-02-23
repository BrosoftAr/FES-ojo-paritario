import React from 'react';
import { InputNumberProps as AntInputNumberProps } from "antd";
import {
  Form,
  InputNumber,
} from "antd";

interface InputProps {
  label: string;
  name: string;
  isRequired?: boolean;
}

const requiredRules = [{ required: true, message: "Dato requerido" }];

const FormInputNumber: React.FC<AntInputNumberProps & InputProps> = ({
  label,
  name,
  isRequired = false,
  ...props
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={isRequired ? requiredRules : []}
    >
      <InputNumber style={{ width: "100%"}} {...props } />
    </Form.Item>
  );
}

export default FormInputNumber;