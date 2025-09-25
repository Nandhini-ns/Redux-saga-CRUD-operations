
import axios from "axios";

const BASE_URL = "https://68d24d03cc7017eec5434487.mockapi.io/students/Data";

// Get all students
export const getStudents = () => axios.get(BASE_URL);

// Add student
export const addStudent = (student) => axios.post(BASE_URL, student);

// Update student
export const updateStudent = (id, student) =>
  axios.put(`https://68d24d03cc7017eec5434487.mockapi.io/students/Data/${id}`, student);

// Delete student
export const deleteStudent = (id) => axios.delete(`${BASE_URL}/${id}`);

