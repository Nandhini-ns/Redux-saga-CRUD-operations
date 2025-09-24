// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addStudent, fetchStudentsRequest } from "../Redux_saga/Actions/Student_Action";


// export default function Register() {
//   const dispatch = useDispatch();
//   const { students, loading, error } = useSelector(state => state.studentsState);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "Male",
//     course: "",
//     marksPercent: "",
//     phone: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     dispatch(fetchStudentsRequest());
//   }, [dispatch]);

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validate = () => {
//     const errors = {};
//     if (!formData.firstName) errors.firstName = "First name required";
//     if (!formData.lastName) errors.lastName = "Last name required";
//     if (!formData.dob) errors.dob = "DOB required";
//     if (!formData.course) errors.course = "Course required";
//     if (!formData.marksPercent) errors.marksPercent = "Marks % required";
//     if (!formData.phone) errors.phone = "Phone required";
//     return errors;
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     const errors = validate();
//     setFormErrors(errors);
//     if (Object.keys(errors).length > 0) return;
//     dispatch(addStudent(formData));
//     setFormData({ firstName:"", lastName:"", dob:"", gender:"Male", course:"", marksPercent:"", phone:"" });
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Register Student</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Form inputs same as before */}
//       </form>
//       <hr />
//       <h3>Students List</h3>
//       {/* Table same as before */}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudentRequest, fetchStudentsRequest } from "../Redux_saga/Actions/Student_Action";
import { FETCH_STUDENTS_REQUEST } from "../Redux_saga/Types/Student_Type";
// import { addStudentRequest, fetchStudentsRequest } from "../Redux_saga/Actions/Student_Action";



export default function Register() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.studentsState);

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Select",
    course: "",
    marksPercent: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch students on mount
 useEffect(() => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });
}, [dispatch]);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name Required";
    if (!formData.lastName) errors.lastName = "Last Name Required";
    if (!formData.dob) errors.dob = "DOB Required";
    if (formData.gender === "Select" || !formData.gender) {
    errors.gender = "Gender Required";}
    if (!formData.course) errors.course = "Course Required";
    if (!formData.marksPercent) errors.marksPercent = "Marks % Required";
    if (!formData.phone) errors.phone = "Phone Required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (isEditing) {
      
      setIsEditing(false);
    } else {
     dispatch(addStudentRequest(formData))

    }

    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      dob: "",
      gender: "select",
      course: "",
      marksPercent: "",
      phone: "",
    });
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
     
    }
  };

//   const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Update the form data
//   setFormData({ ...formData, [name]: value });

//   // Remove the error message for this field immediately
//   setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
// };


  return (
    <div className="container mt-5">
      <h2>{isEditing ? "Edit Student" : "Register Student"}</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
             placeholder="Enter First Name"
          />
          {formErrors.firstName && <small className="text-danger">{formErrors.firstName}</small>}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
             placeholder="Enter Last Name"
          />
          {formErrors.lastName && <small className="text-danger">{formErrors.lastName}</small>}
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Select Date of Birth"
          />
          {formErrors.dob && <small className="text-danger">{formErrors.dob}</small>}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label>Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {formErrors.gender && (
          <small className="text-danger">{formErrors.gender}</small>)}
        </div>

        {/* Course */}
        <div className="mb-3">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter Course"
          />
          {formErrors.course && <small className="text-danger">{formErrors.course}</small>}
        </div>

        {/* Marks */}
        <div className="mb-3">
          <label>Marks %</label>
          <input
            type="number"
            className="form-control"
            name="marksPercent"
            value={formData.marksPercent}
            onChange={handleChange}
            placeholder="Enter Marks Percentage"
          />
          {formErrors.marksPercent && <small className="text-danger">{formErrors.marksPercent}</small>}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
             placeholder="Enter Phone Number"
          />
          {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEditing ? "Update" : "Submit"}
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
              <th>Actions</th>
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
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
