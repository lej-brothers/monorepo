/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import styled from "styled-components";
import { Input } from "antd";
import type { InputProps } from "antd";

export default (props: InputProps) => {
  return (
    <StyledInput
      {...props}
      className={`bg-stone-100 px-[16px] py-[17px] ${props.className}`}
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
