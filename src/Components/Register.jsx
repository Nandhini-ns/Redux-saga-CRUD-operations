// register.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_STUDENT, FETCH_STUDENTS, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_FAILURE } from "../Types/Student_Type";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(state => state.studentsState);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    course: "",
    marksPercent: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    dispatch({ type: FETCH_STUDENTS });
    try {
      const res = await axios.get("https://68d24d03cc7017eec5434487.mockapi.io/students/");
      dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_STUDENTS_FAILURE, payload: err.message });
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.dob) errors.dob = "Date of Birth is required";
    if (!formData.course) errors.course = "Course is required";
    if (!formData.marksPercent) errors.marksPercent = "Marks % is required";
    if (!formData.phone) errors.phone = "Phone is required";
    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    dispatch({ type: ADD_STUDENT });
    try {
      const res = await axios.post("https://68d24d03cc7017eec5434487.mockapi.io/students/", formData);
      dispatch({ type: ADD_STUDENT_SUCCESS, payload: res.data });
      alert("Student added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "Male",
        course: "",
        marksPercent: "",
        phone: "",
      });
    } catch (err) {
      dispatch({ type: ADD_STUDENT_FAILURE, payload: err.message });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && <small className="text-danger">{formErrors.firstName}</small>}
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && <small className="text-danger">{formErrors.lastName}</small>}
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {formErrors.dob && <small className="text-danger">{formErrors.dob}</small>}
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
          {formErrors.course && <small className="text-danger">{formErrors.course}</small>}
        </div>

        <div className="mb-3">
          <label>Marks %</label>
          <input
            type="number"
            className="form-control"
            name="marksPercent"
            value={formData.marksPercent}
            onChange={handleChange}
          />
          {formErrors.marksPercent && <small className="text-danger">{formErrors.marksPercent}</small>}
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>

      <hr />
      <h3>Students List</h3>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Marks %</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id}>
                <td>{idx + 1}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dob}</td>
                <td>{student.gender}</td>
                <td>{student.course}</td>
                <td>{student.marksPercent}</td>
                <td>{student.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
