import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as service from '../../services/studentService';

import {
fetchStudentsSuccess,
fetchStudentsFailure,
addStudentSuccess,
addStudentFailure,

} from '../actions';


function* fetchStudentsSaga() {
try {
const res = yield call(service.getStudents);
yield put(fetchStudentsSuccess(res.data));
} catch (err) {
yield put(fetchStudentsFailure(err.message));
}
}


function* addStudentSaga(action) {
try {
const res = yield call(service.createStudent, action.payload);
yield put(addStudentSuccess(res.data));
} catch (err) {
yield put(addStudentFailure(err.message));
}
}


export default function* studentSaga() {
yield takeLatest(types.FETCH_STUDENTS, fetchStudentsSaga);
yield takeLatest(types.ADD_STUDENT, addStudentSaga);
}

