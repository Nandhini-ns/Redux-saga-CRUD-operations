import { ADD_STUDENT, ADD_STUDENT_FAILURE, ADD_STUDENT_SUCCESS, FETCH_STUDENTS, FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_SUCCESS } from "../Types/Student_Type";

const initialState={
    loading: false,
    students:[],
    error:null,
};

export default function StudentReducer(state=initialState,action) {
    switch(action.type){
        case FETCH_STUDENTS:
        case ADD_STUDENT:
            return{...state, loading:true, error:null};
        case FETCH_STUDENTS_SUCCESS:
            return{...state,loading:false,students:action.payload};
        case ADD_STUDENT_SUCCESS:
            return{...state,loading:false,students:[...state.students,action.payload]};

        case FETCH_STUDENTS_FAILURE:
        case ADD_STUDENT_FAILURE:
            return{...state,loading:false,error:action.payload};

        default:
            return state;
        
    }
  
}
