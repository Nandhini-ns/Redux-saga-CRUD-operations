import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_STUDENT_REQUEST, FETCH_STUDENTS_REQUEST } from "../Redux_saga/Types/Student_Type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  
//  Replace your previous filteredStudents with this:
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      (student.firstName || "").toLowerCase().includes(term) ||
      (student.lastName || "").toLowerCase().includes(term) ||
      (student.dob || "").toLowerCase().includes(term) ||
      (student.gender || "").toLowerCase().includes(term) ||
      (student.course || "").toLowerCase().includes(term) ||
      (student.marksPercent || "").toString().toLowerCase().includes(term) ||
      (student.phone || "").toLowerCase().includes(term) ||
      (student.address || "").toLowerCase().includes(term)
    );
  });
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch({ type: DELETE_STUDENT_REQUEST, payload: id });
      setTimeout(() => {
      toast.success("Student deleted successfully!");
    }, 200);
    }
  };

  const handleEdit = (student) => {
    // Navigate to register page with student data for editing
    navigate("/register", { state: { student } });
  };

  const handleView = (student) => {
   setSelectedStudent(student);
   setShowModal(true);
   toast.info("Viewing student details");
  };
  const handleCloseModal = () => {setShowModal(false);
     toast.success("Closed student details");
  };
  
  return (
    <div className="container mt-4">
      {/* Header & Search */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 d-flex align-items-center">
          <h2 className="mb-0">Students List</h2>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column flex-sm-row justify-content-end">
          <input
            type="text"
            className="form-control mb-2 mb-sm-0 me-sm-2"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => navigate("/register")}
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {filteredStudents.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
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
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, id) => (
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
                  <td className="text-center">
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
        </div>
      )}

      {/* View Modal */}
      {showModal && selectedStudent && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
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
                <div className="table-responsive">
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
        </div>
      )}

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );

}
