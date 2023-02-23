import React from 'react';
import { SelectProps as AntSelectProps } from "antd";
import {
  Form,
  Select,
} from "antd";

interface SelectProps {
  label: string;
  name: string;
  isRequired?: boolean;
  typeEnum: object;
  typeLabelEnum: object;
}

const requiredRules = [{ required: true, message: "Dato requerido" }];

const FormSelect: React.FC<AntSelectProps & SelectProps> = ({
  label,
  name,
  isRequired = false,
  typeEnum,
  typeLabelEnum,
  ...props
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={isRequired ? requiredRules : []}
    >
    <Select {...props}>
      {Object.values(typeEnum).map((type) => (
        <Select.Option key={type} value={type}>
          {typeLabelEnum[type]}
        </Select.Option>
      ))}
    </Select>

  </Form.Item>
  );
}

export default FormSelect;