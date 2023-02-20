import { createAction } from "@reduxjs/toolkit";
import ActionTypes from "./actions.type";

export const toggleCartDrawer = createAction(ActionTypes.TOGGLE);

