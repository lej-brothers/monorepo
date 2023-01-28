import React from "react";
import { Select, SelectProps } from "antd";
import { Controller } from "react-hook-form";

interface Props extends SelectProps {
  name: string;
}

const IntegratedSelect = ({ name, ...rest }: Props) => (
  <Controller
    name={name}
    render={({ field }) => <Select {...field} {...rest} />}
  />
);

export default IntegratedSelect;
