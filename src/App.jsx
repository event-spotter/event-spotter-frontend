import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <div className="text-blue-700 flex items-center justify-center">
        Event Spotter
      </div>

      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
