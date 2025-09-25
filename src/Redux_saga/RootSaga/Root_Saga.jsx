import { all } from "redux-saga/effects";
import studentSaga from "../Saga/StudentsSaga";
export default function* rootSaga() {
  yield all([
    studentSaga()
  ]);
}
