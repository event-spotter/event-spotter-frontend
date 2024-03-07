import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
<<<<<<< HEAD
=======
import NavBar from "./components/NavBar";

>>>>>>> fe90d8f (add navbar)
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
<<<<<<< HEAD
=======
      <div className="text-blue-700 flex items-center justify-center">
        Event Spotter
      </div>
      <NavBar />

>>>>>>> fe90d8f (add navbar)
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
