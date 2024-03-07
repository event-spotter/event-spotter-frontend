import "./App.css"; 
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div className="text-blue-700 flex items-center justify-center">
        Event Spotter
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
