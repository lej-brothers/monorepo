/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { Radio } from "antd";
import type { RadioProps } from "antd";
import styled from "styled-components";

export default (props: RadioProps) => {
  return <StyledRadio {...props} />;
};

const StyledRadio = styled(Radio)`
  .ant-radio {
    .ant-radio-inner {
      border-color: black;
      background: white;
    }

    .ant-radio-inner::after {
      background: black;
    }
  }
`;
