import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import BackgroundImage from "../assets/dashboard_background.jpg";

const API_URL = "http://localhost:5005";

function Dashboard() {
  return (
    <div className="relative">
    <div className="relative inset-0 flex items-center justify-center">
      <img
        src={BackgroundImage}
        className="object-cover w-full h-96"
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div className="text-2xl mb-8">Are you ready?</div>
        <div className="text-lg leading-relaxed">Have the joy</div>
      </div>
      </div>
      <section className="bg-gray-100 py-6 text-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Find Events Waiting for You
          </h2>
          <p className="text-lg">
            Discover all the events for a unique experience.
          </p>
        </div>
      </section>
   
    </div>
  );
}

export default Dashboard;
