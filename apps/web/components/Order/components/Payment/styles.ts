import { CSSProperties } from "react";

export const PANEL_INACTIVE_STYLE: CSSProperties = {
  borderRadius: 8,
  marginBottom: 24,
  background: "rgb(245, 245, 244)",
  border: "none",
};

export const PANEL_ACTIVE_STYLE: CSSProperties = {
  borderRadius: 8,
  marginBottom: 24,
  border: "1px solid black",
  background: "white",
};

export const PANEL_STYLE = {
  true: PANEL_ACTIVE_STYLE,
  false: PANEL_INACTIVE_STYLE,
};
