import { createAction } from "@reduxjs/toolkit";
import ActionTypes from "./actions.type";

export const getOrder = createAction(ActionTypes.GET);

export const addItemOrder = createAction(ActionTypes.ADD_ITEM);

export const removeItemOrder = createAction(ActionTypes.REMOVE_ITEM);

export const addPromotionOrder = createAction(ActionTypes.ADD_PROMOTION);
