import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  DramaIcon,
  GuitarIcon,
  LaughIcon,
  LandmarkIcon,
  MapPinIcon,
  UserIcon,
  User,
} from "lucide-react";



function Timeline() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEvents = () => {
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => {
        if (response.data) {
          let eventList = response.data;
          eventList.sort((a, b) => new Date(a.date) - new Date(b.date));
          setEvents(eventList);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const categoryIconSet = [
    {
      icon: <DramaIcon />,
      category: "Theatre",
    },
    {
      icon: <GuitarIcon />,
      category: "Concert",
    },
    {
      icon: <LaughIcon />,
      category: "Comedy",
    },
    {
      icon: <LandmarkIcon />,
      category: "Museum",
    },
  ];

 

  useEffect(() => {
    getAllEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <div className="leading-[1.235] tracking-[0.00735em] text-[rgb(38,71,94)] 
        font-bold text-[2rem] uppercase mt-20  text-center "> upcoming events</div>
      <div className="mt-12 flex justify-center">
      
        <VerticalTimeline lineColor="grey">
          {events.map((event) => (
            <VerticalTimelineElement
               key={event._id}
              className="vertical-timeline-element  "
              contentStyle={{ background: "rgb(0,0,0,0.08)" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(0,0,0,0.08)",
              }}
              date={new Date(event.date).toDateString()}
              dateClassName="text-[rgb(38,71,94)]"
              iconStyle={{ background: "rgb(255,189,89)", color: "#fff" }}
              icon={
                categoryIconSet.find((a) => a.category === event.category).icon
              }
            >
              <h3 className="vertical-timeline-element-title text-center">{event.title}</h3>
              <img
                className="h-56 w-full  object-cover m-0 mt-4"
                src={event.image}
                alt={event.title}
              />
              <div className="flex flex-row justify-center gap-32">
              <div className="mt-5 gap-2 flex justify-start">
                   <UserIcon /> {event.artist.name} 
              </div> 
              <div className="mt-5 gap-2 flex justify-start">
                <MapPinIcon /> {event.location}
              </div>
              </div>
              <div className="flex justify-center py-3">
              <Link to={`/events/${event._id}`}>
                  <Button variant="button2" className="mt-4" size="sm">
                    See details
                  </Button>
                </Link>
                </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default Timeline;
