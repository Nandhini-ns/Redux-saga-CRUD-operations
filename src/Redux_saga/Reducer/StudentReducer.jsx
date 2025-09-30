
import { ADD_STUDENT_FAILURE, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, DELETE_STUDENT_FAILURE, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_REQUEST, FETCH_STUDENTS_SUCCESS, UPDATE_STUDENT_FAILURE, UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS } from "../Types/Student_Type";

const initialState={
    students:[],
    loading:false,
    error:null,
};
export const StudentReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_STUDENTS_REQUEST:
        case ADD_STUDENT_REQUEST:
        case UPDATE_STUDENT_REQUEST:
        case DELETE_STUDENT_REQUEST:
            return{...state,loading:true,error:null};

        case FETCH_STUDENTS_SUCCESS:
             return { ...state, loading: false, students: action.payload };
        case FETCH_STUDENTS_FAILURE:
             return { ...state, loading: false, error: action.payload };
       case ADD_STUDENT_SUCCESS:
         return { ...state, loading: false, students: [...state.students, action.payload] };
       case ADD_STUDENT_FAILURE:
         return { ...state, loading: false, error: action.payload };

    //  Update student success/failure
       case UPDATE_STUDENT_SUCCESS:
        return {
           ...state,
           loading: false,
           students: state.students.map((s) =>
           s.id === action.payload.id ? action.payload : s
           ),
         };
      case UPDATE_STUDENT_FAILURE:
         return { ...state, loading: false, error: action.payload };

    // Delete student success/failure
     case DELETE_STUDENT_SUCCESS:
        return {
         ...state,
         loading: false,
         students: state.students.filter((s) => s.id !== action.payload),
        };
     case DELETE_STUDENT_FAILURE:
        return { ...state, loading: false, error: action.payload };


        default:
            return state;
    }
};
