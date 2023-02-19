/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { Controller } from "react-hook-form";
import styled from "styled-components";
import { Input } from "antd";
import type { InputProps } from "antd";

interface Props extends InputProps {
  name: string;
}

export default ({ name, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <StyledInput
          {...field}
          {...rest}
          className={`bg-stone-100 px-[16px] py-[17px] ${rest.className}`}
        />
      )}
    />
  );
};

const StyledInput = styled(Input)`
  border: none;

  :hover {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.19);
  }

  :focus {
    border-color: black !important;
    box-shadow: 0 0 0 2px black;
  }
`;
