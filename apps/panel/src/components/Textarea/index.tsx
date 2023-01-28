import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import React from "react";
import { Controller } from "react-hook-form";

const { TextArea } = Input;


interface Props extends TextAreaProps {
  name: string;
}

const IntegratedTextArea = ({ name, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <TextArea {...field} {...rest} />}
    />
  );
};

export default IntegratedTextArea;

