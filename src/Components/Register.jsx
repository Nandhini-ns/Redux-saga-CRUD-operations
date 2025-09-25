
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { addStudentRequest, updateStudentRequest } from "../Redux_saga/Actions/Student_Action";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Select",
    course: "",
    marksPercent: "",
    phone: "",
    address: "",
  });

    useEffect(() => {
    if (location.state?.student) {
      setFormData(location.state.student);
      }
       }, [location.state]);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name Required";
    if (!formData.lastName) errors.lastName = "Last Name Required";
    if (!formData.dob) errors.dob = "DOB Required";
    if (formData.gender === "Select" || !formData.gender)
      errors.gender = "Gender Required";
    if (!formData.course) errors.course = "Course Required";
    if (!formData.marksPercent) errors.marksPercent = "Marks % Required";

    // ✅ Phone validation - must be exactly 10 digits
    if (!formData.phone) {
      errors.phone = "Phone Required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }

    if (!formData.address) errors.address = "Address Required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
   if (formData.id) {
  dispatch(updateStudentRequest(formData)); // send entire formData including id
} else {
  dispatch(addStudentRequest(formData));
}


    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      dob: "",
      gender: "Select",
      course: "",
      marksPercent: "",
      phone: "",
      address: "",
    });

    navigate("/StudentList");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "650px" }}>
        <h2 className="text-center mb-4">Register Student</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1: First , Last Name */}
          <div className="row mb-3">
            <div className="col">
              <label className="fw-bold">First Name<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
              {formErrors.firstName && (
                <small className="text-danger">{formErrors.firstName}</small>
              )}
            </div>
            <div className="col">
              <label className="fw-bold">Last Name<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
              {formErrors.lastName && (
                <small className="text-danger">{formErrors.lastName}</small>
              )}
            </div>
          </div>

          {/* Row 2: DOB ,Gender */}
          <div className="row mb-3">
            <div className="col">
              <label className="fw-bold">Date of Birth<span className="text-danger">*</span></label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {formErrors.dob && (
                <small className="text-danger">{formErrors.dob}</small>
              )}
            </div>
            <div className="col">
              <label className="fw-bold">Gender<span className="text-danger">*</span></label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="Select">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formErrors.gender && (
                <small className="text-danger">{formErrors.gender}</small>
              )}
            </div>
          </div>

          {/* Row 3: Course + Marks */}
          <div className="row mb-3">
            <div className="col">
              <label className="fw-bold">Course<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="course"
                value={formData.course || ""}
                onChange={handleChange}
                placeholder="Enter Course"
              />
              {formErrors.course && (
                <small className="text-danger">{formErrors.course}</small>
              )}
            </div>
            <div className="col">
              <label className="fw-bold">Marks %<span className="text-danger">*</span></label>
              <input
                type="number"
                className="form-control"
                name="marksPercent"
                value={formData.marksPercent || ""}
                onChange={handleChange}
                placeholder="Enter Marks %"
              />
              {formErrors.marksPercent && (
                <small className="text-danger">{formErrors.marksPercent}</small>
              )}
            </div>
          </div>

          {/* Row 4: Phone + Address */}
          <div className="row mb-3">
            <div className="col">
              <label className="fw-bold">Phone<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Enter 10-digit Phone"
                maxLength="10"
              />
              {formErrors.phone && (
                <small className="text-danger">{formErrors.phone}</small>
              )}
            </div>
            <div className="col">
              <label className="fw-bold">Address<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Enter Address"
              />
              {formErrors.address && (
                <small className="text-danger">{formErrors.address}</small>
              )}
            </div>
          </div>

          {/* Submit */}
          {/* <button type="submit" className="btn btn-primary w-100">
            Submit
          </button> */}
          <div className="d-flex justify-content-end">
         <button type="submit" className="btn btn-primary">
           Submit
         </button>
        </div>
        </form>
      </div>
    </div>
  );
}
