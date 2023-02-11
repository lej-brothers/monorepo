/* eslint-disable import/no-anonymous-default-export */

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import "regenerator-runtime/runtime";

import rootReducer from "./reducers";

import { orderSagas } from "./reducers/order/sagas";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  sagaMiddleware.run(orderSagas);

  return { store, persistor };
};
