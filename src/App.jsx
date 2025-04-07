import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./pages/JobListPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/:uid" element={<JobListPage />} />

      </Routes>
    </Router>
  );
}

export default App;
