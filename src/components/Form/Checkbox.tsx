import React from 'react';
import { CheckboxProps as AntCheckboxProps } from "antd";
import {
  Form,
  Checkbox,
} from "antd";

interface InputProps {
  label: string;
  name: string;
  isRequired?: boolean;
}

const FormCheckbox: React.FC<AntCheckboxProps & InputProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <Form.Item name={name} valuePropName="checked" >
      <Checkbox {...props}>
        {label}
      </Checkbox>
    </Form.Item>
  );
}

export default FormCheckbox;