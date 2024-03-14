import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import ArtistListPage from "./pages/ArtistListPage";
import AddEvent from "./components/AddEvent";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import EventDetails from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import AddArtist from "./components/AddArtist";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import ProfilePage from "./pages/ProfilePage";
import MyEventsPage from "./pages/MyEventsPage";
import MyFavoritesPage from "./pages/MyFavoritesPage"
import PageNotFound from "./pages/PageNotFound";



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
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/artists" element={<ArtistListPage />} />
        <Route path="/addArtist" element={<AddArtist />} />
        <Route path="/profile" element={ <IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="/myEventsPage" element={ <IsPrivate><MyEventsPage /></IsPrivate>} />
        <Route path="/myFavoritesPage" element={ <IsPrivate><MyFavoritesPage /></IsPrivate>} />
        <Route path="/events/edit/:eventId" element={<EditEventPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
