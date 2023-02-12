import { combineReducers } from "redux";

import orderReducer from "./order/reducer";

const rootReducer = combineReducers({ order: orderReducer });

export default rootReducer;
