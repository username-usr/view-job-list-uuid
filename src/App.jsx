import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./pages/JobListPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/jobs" element={<JobListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
