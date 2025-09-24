import { combineReducers } from "@reduxjs/toolkit";
import { StudentReducer } from "../Reducer/StudentReducer";
// import StudentReducer from "../Reducer/StudentReducer";

export default combineReducers({
    studentsState:StudentReducer,
});