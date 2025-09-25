
import { call, put, takeLatest } from 'redux-saga/effects';
import { addStudent, deleteStudent, getStudents, updateStudent } from '../../Service/Students_Api';
import { addStudentFailure, addStudentSuccess, deleteStudentFailure,deleteStudentSuccess, fetchStudentsFailure, fetchStudentsSuccess, updateStudentFailure,updateStudentSuccess } from '../Actions/Student_Action';
import { ADD_STUDENT_REQUEST, DELETE_STUDENT_REQUEST, FETCH_STUDENTS_REQUEST, UPDATE_STUDENT_REQUEST } from '../Types/Student_Type';

// FETCH STUDENTS
function* fetchStudentsSaga() {
  try {
    const res = yield call(getStudents); // call API function
    yield put(fetchStudentsSuccess(res.data));
  } catch (err) {
    yield put(fetchStudentsFailure(err.message));
  }
}

function* addStudentSaga(action) {
  try {
    const res = yield call(addStudent, action.payload); // ✅ API function call
    yield put(addStudentSuccess(res.data));
  } catch (err) {
    yield put(addStudentFailure(err.message));
  }
}

function* updateStudentSaga(action) {
  try {
    const student = action.payload;
    const res = yield call(updateStudent, student.id, student);
    yield put(updateStudentSuccess(res.data));
  } catch (err) {
    yield put(updateStudentFailure(err.message));
  }
}



// DELETE STUDENT
function* deleteStudentSaga(action) {
  try {
    yield call(deleteStudent, action.payload); // call API function
    yield put(deleteStudentSuccess(action.payload)); // send deleted ID to reducer
  } catch (err) {
    yield put(deleteStudentFailure(err.message));
  }
}

// WATCHER SAGA
export default function* studentSaga() {
  yield takeLatest(FETCH_STUDENTS_REQUEST, fetchStudentsSaga);
  yield takeLatest(ADD_STUDENT_REQUEST, addStudentSaga);
  yield takeLatest(UPDATE_STUDENT_REQUEST, updateStudentSaga);
  yield takeLatest(DELETE_STUDENT_REQUEST, deleteStudentSaga);
}


