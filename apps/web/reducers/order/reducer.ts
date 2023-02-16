import { createAction, createReducer } from "@reduxjs/toolkit";
import { IStore } from "../../types/IStore";

import * as actions from "./actions";

const orderReducer = createReducer<IStore["order"]>(false, (builder) => {
  builder.addCase(actions.toggleOrderDrawer, (state, _) => {
    state = !state;
    return state;
  });
});

export default orderReducer;
