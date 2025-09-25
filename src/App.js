
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./Components/StudentList";
import Register from "./Components/Register";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/studentlist" element={<StudentList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
