import { createReducer } from "@reduxjs/toolkit";
import { IStore } from "../../types/IStore";

import * as actions from "./actions";

const searchReducer = createReducer<IStore["search"]>(false, (builder) => {
  builder.addCase(actions.toggleSearchDrawer, (state, _) => {
    state = !state;
    return state;
  });
});

export default searchReducer;
