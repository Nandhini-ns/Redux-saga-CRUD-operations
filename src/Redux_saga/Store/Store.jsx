import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Root_Reducer from "../RootReducer/Root_Reducer";
import rootSaga from "../RootSaga/Root_Saga";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Redux store without DevTools
const store = createStore(
  Root_Reducer,
  applyMiddleware(sagaMiddleware)
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;

