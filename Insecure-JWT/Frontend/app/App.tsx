
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./routes/register";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;