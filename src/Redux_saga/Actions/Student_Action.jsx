import { type } from "@testing-library/user-event/dist/type";

import{types}from "../Types/Student_Type";

export const fetchStudentsRequest=()=>({
    type: types.FETCH_STUDENTS,
});
export const fetchStudentsSuccess=(data)=>({
    type: types.FETCH_STUDENTS_SUCCESS,
    payload:data,
});
export const fetchStudentsFailure=(error)=>({
    type: types.FETCH_STUDENTS_FAILURE,
    payload:error,
});

export const addStudent=(payload)=>({
    type: types.ADD_STUDENT,
    payload,
});
export const addStudentSuccess=(data)=>({
    type:types.ADD_STUDENT_SUCCESS,
    payload:data,
});
export const addStudentFailure=(error)=>({
    type:types.ADD_STUDENT_FAILURE,
    payload:error,
});
