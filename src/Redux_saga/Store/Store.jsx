// import {configureStore } from "redux";
import createSagaMiddleware from "redux-saga";
import Root_Reducer from "../RootReducer/Root_Reducer";
import rootSaga from "../RootSaga/Root_Saga";
import { configureStore } from "@reduxjs/toolkit";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Redux store without DevTools
// const store = createStore(
//   Root_Reducer,
//   applyMiddleware(sagaMiddleware)
// );

 const store = configureStore({
  reducer: Root_Reducer, // oru object illa root reducer single-a irundha direct-a kudukkanum
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;

