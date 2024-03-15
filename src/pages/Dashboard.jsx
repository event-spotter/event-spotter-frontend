import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/dashboard_background.jpg";
import DashboardCarousel from "../components/DashboardCarousel"

function Dashboard() {
  
  const API_URL = import.meta.env.VITE_API_URL;

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
        className="relative w-full h-[58rem] text-white flex flex-col items-center justify-center left-0;
         center/cover no-repeat"
        // className="w-full h-1/6 object-cover"
        alt="Background"
      />
      <div className="absolute flex flex-col items-center justify-center text-center text-white">
        <div className="font-light font-mono text-6xl leading-[1.2] tracking-[-0.00833em] text-center text-inherit m-0">Unlock Experiences</div>
        <div className="font-normal font-mono tracking-wide text-2xl leading-[1.334] tracking-normal text-center text-inherit mt-12 mb-8 mx-0">Explore new horizons and craft unforgettable memories</div>
      </div>
      </div>
      <section className="py-6 text-center">
        <div>
          <h1 className="text-4xl text-sky-900 font-bold mb-4 mt-5">
            Find Events Waiting for You
          </h1>
          <p className="text-lg text-sky-900">
            Discover all the events for a unique experience
          </p>
        </div>
      </section>

<DashboardCarousel events={events}/> 
      
   
    </>
  );
}

export default Dashboard;
