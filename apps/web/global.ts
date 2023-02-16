import { createGlobalStyle } from "styled-components";
import { sfPro } from "./pages/sf-pro.font";

export default createGlobalStyle`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    * {
      font-family: ${sfPro.style.fontFamily}; !important
    }
`;
