
import { ADD_STUDENT_FAILURE, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, DELETE_STUDENT_FAILURE, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_REQUEST, FETCH_STUDENTS_SUCCESS, UPDATE_STUDENT_FAILURE, UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS } from "../Types/Student_Type";
export const fetchStudentsRequest=(payload)=>({
    type:FETCH_STUDENTS_REQUEST,
    payload,
});
export const fetchStudentsSuccess=(data)=>({
    type:FETCH_STUDENTS_SUCCESS,
    payload:data,
});
export const fetchStudentsFailure=(error)=>({
    type:FETCH_STUDENTS_FAILURE,
    payload:error,
});

export const addStudentRequest=(payload)=>({
  type:ADD_STUDENT_REQUEST,
  payload,
});
export const addStudentSuccess=(data)=>({
    type:ADD_STUDENT_SUCCESS,
    payload:data,
});
export const addStudentFailure=(error)=>({
    type:ADD_STUDENT_FAILURE,
    payload:error,
});

export const updateStudentRequest = (student) => ({
  type:UPDATE_STUDENT_REQUEST,
  payload: student, // entire object containing id + updated fields
});

export const updateStudentSuccess=(student)=>({
    type:UPDATE_STUDENT_SUCCESS,
    payload:student,
});
export const updateStudentFailure=(error)=>({
    type:UPDATE_STUDENT_FAILURE,
    payload:error,
});

export const deleteStudentRequest=(id)=>({
type:DELETE_STUDENT_REQUEST,
payload:id,
});
export const deleteStudentSuccess=(id)=>({
    type:DELETE_STUDENT_SUCCESS,
    payload:id,
})
export const deleteStudentFailure=(error)=>({
    type:DELETE_STUDENT_FAILURE,
    payload:error,
});