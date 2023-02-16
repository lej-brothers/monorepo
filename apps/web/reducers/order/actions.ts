import { createAction } from "@reduxjs/toolkit";
import ActionTypes from "./actions.type";

export const toggleOrderDrawer = createAction(ActionTypes.TOGGLE);

