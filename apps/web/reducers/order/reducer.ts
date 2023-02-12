import { createAction, createReducer } from "@reduxjs/toolkit";
import { IStore } from "../../types/IStore";

import * as actions from "./actions";

const orderReducer = createReducer<IStore>({} as IStore, (builder) => {
  builder.addCase(actions.setOrder, (state, action) => {
    state.order = { ...action.payload };
    return state;
  });
});

export default orderReducer;
