import React from 'react';
import { InputProps as AntInputProps } from "antd";
import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea"

interface TextAreaProps {
  label: string;
  name: string;
  isRequired?: boolean;
}

const requiredRules = [{ required: true, message: "Dato requerido" }];

const FormTextArea: React.FC<AntInputProps & TextAreaProps> = ({
  label,
  name,
  placeholder,
  isRequired = false,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={isRequired ? requiredRules : []}
    >
      <TextArea placeholder={placeholder} />
    </Form.Item>
  );
}

export default FormTextArea;