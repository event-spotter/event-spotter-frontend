import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/dashboard_background.jpg";
import DashboardCarousel from "../components/DashboardCarousel"

function Dashboard() {

  const API_URL = "http://localhost:5005";

    const [events, setEvents] = useState([]);

    const getAllEvents = () => {
      axios
        .get(`${API_URL}/api/events`)
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      getAllEvents();
    }, []);

  return (
    <>

    <div className="relative min-h-screen flex items-center justify-center">
      <img
        src={BackgroundImage}
        className="relative w-full h-[65rem] text-white flex flex-col items-center justify-center left-0;
         center/cover no-repeat"
        // className="w-full h-1/6 object-cover"
        alt="Background"
      />
      <div className="absolute flex flex-col items-center justify-center text-center text-white">
        <div className="text-8xl align-top mt-6 mb-4">Are you ready?</div>
        <div className="text-5xl leading-relaxed">Have the joy</div>
      </div>
      </div>
      <section className="bg-sky-900 py-6 text-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Find Events Waiting for You
          </h2>
          <p className="text-lg">
            Discover all the events for a unique experience.
          </p>
        </div>
      </section>

<DashboardCarousel events={events}/> 
      
   
    </>
  );
}

export default Dashboard;
