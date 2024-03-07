import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Dashboard() {
  return (
    <div className="HomePage">
      <div className="banner">
        <div className="banner-text">
          <div className="tagline">Are you ready?</div>
          <div className="explanation">Have the joy</div>
        </div>
      </div>
      <section className="bridge-section">
        <div className="bridge-content">
          <h2>Find Events Waiting for You</h2>
          <p>
            Discover all the events for a unique experience.
          </p>
        </div>
      </section>
   
      
    </div>
  );
}

export default Dashboard;
