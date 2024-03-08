import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import ArtistListPage from "./pages/ArtistListPage";
import AddEvent from "./components/AddEvent";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import EventDetails from "./pages/EventDetailsPage";



function App() {
  return (
    <>
   <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events/:eventId" element={<EventDetails />}></Route>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/artists" element={<ArtistListPage />} />
        <Route path="/addEvent" element={<AddEvent />} />
      </Routes>
    </>
  );
}

export default App;