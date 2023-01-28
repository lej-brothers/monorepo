import { Input, InputProps } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

interface Props extends InputProps {
  name: string;
}

const IntergratedInput = ({ name, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <Input {...field} {...rest} />}
    />
  );
};

export default IntergratedInput;
