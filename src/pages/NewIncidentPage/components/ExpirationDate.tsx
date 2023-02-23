import React, { useState } from "react";
import {
  Form,
  DatePicker,
} from "antd";

const ExpirationDate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Form.Item name="appealExpirationDate" rules={[{ required: true, message: "Dato requerido" }]}>
      <DatePicker
        autoFocus
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={ () => setIsOpen(!isOpen)} 
        open={isOpen} 
        showToday={false} 
        format="DD/MM/YYYY" 
        placeholder="Seleccionar fecha" 
        style={{ width: '100%'}}/> 
    </Form.Item>
  );
};
export default ExpirationDate;
