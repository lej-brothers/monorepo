import { Switch, SwitchProps } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

interface Props extends SwitchProps {
  name: string;
}

const IntergratedSwitch = ({ name, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <Switch {...field} {...rest} />}
    />
  );
};

export default IntergratedSwitch;
