import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_STUDENT_REQUEST, FETCH_STUDENTS_REQUEST } from "../Redux_saga/Types/Student_Type";

export default function StudentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector(
    (state) => state.studentsState );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch({ type: FETCH_STUDENTS_REQUEST });
  }, [dispatch]);

  // Filter students based on search term
   const filteredStudents = students.filter((student) =>
    (student.firstName || "").toLowerCase().includes(searchTerm.toLowerCase())
   );
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch({ type: DELETE_STUDENT_REQUEST, payload: id });
    }
  };

  const handleEdit = (student) => {
    // Navigate to register page with student data for editing
    navigate("/register", { state: { student } });
  };

  const handleView = (student) => {
   setSelectedStudent(student);
   setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
     <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Students List</h2>
      <div className="d-flex">
      <input
      type="text"
      className="form-control ms-2"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/register")}
      >
        + Add Student
      </button>
     </div>
     </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {/* {students.length === 0 ? ( */}
       {filteredStudents.length === 0 ? (
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
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, id) => (
              <tr key={student.id}>
                <td>{id + 1}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dob}</td>
                <td>{student.gender}</td>
                <td>{student.course}</td>
                <td>{student.marksPercent}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(student)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
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

      {/* View Modal */}
      {showModal && selectedStudent && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Student Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>First Name</th>
                      <td>{selectedStudent.firstName}</td>
                    </tr>
                    <tr>
                      <th>Last Name</th>
                      <td>{selectedStudent.lastName}</td>
                    </tr>
                    <tr>
                      <th>DOB</th>
                      <td>{selectedStudent.dob}</td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td>{selectedStudent.gender}</td>
                    </tr>
                    <tr>
                      <th>Course</th>
                      <td>{selectedStudent.course}</td>
                    </tr>
                    <tr>
                      <th>Marks %</th>
                      <td>{selectedStudent.marksPercent}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{selectedStudent.phone}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{selectedStudent.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
