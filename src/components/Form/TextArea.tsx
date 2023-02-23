import React from 'react';
import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea"

interface TextAreaProps {
  label: string;
  name: string;
  isRequired?: boolean;
}

const requiredRules = [{ required: true, message: "Dato requerido" }];

const FormTextArea: React.FC<TextAreaProps> = ({
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
      <TextArea {...props} />
    </Form.Item>
  );
}

export default FormTextArea;