import { IOrder } from "common";
import { put, takeLatest } from "redux-saga/effects";
import OrderService from "../../modules/order.module";
import { setOrder } from "./actions";
import ActionTypes from "./actions.type";

function* getOrder() {
  const order: IOrder = yield OrderService.get();
  yield put(setOrder({ ...order }));
}

export function* orderSagas() {
  yield takeLatest(ActionTypes.GET, getOrder);
}
