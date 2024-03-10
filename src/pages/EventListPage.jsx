import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaTrashCan } from "react-icons/fa6";

function EventListPage() {
  const API_URL = "http://localhost:5005";

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

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

  const deleteEvent = (eventId) => {
    axios
      .delete(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        const newEvent = events.filter((eventObj) => eventObj._id !== eventId);
        setEvents(newEvent);
        setFilteredEvents(newEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderEventCard = (event, index) => (
    <div key={`${event.id}-${index}`} className="flex flex-col items-center">
      <Card className="w-full h-full">
        <CardContent className="flex flex-col justify-start items-center gap-2">
          <img
          className="h-56 w-full rounded-lg object-cover p-3"
            src={event.image}
            alt={event.title}
          />
          <div className="flex flex-col text-center">
            <span className="text-xl font-semibold ">{event.title}</span>
            <span className="text-lg">{event.category}</span>
    
          </div>
        </CardContent>
        <CardFooter className="flex  justify-center items-center">
          <div className="flex">
            <Link to={`/api/events/${event._id}`}>
              <Button variant="button" className="mx-2">See details</Button>
            </Link>
            <Button variant="button"
              onClick={() => {
                deleteEvent(event._id);
              }}
            >
              <FaTrashCan className="text-md" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <> 
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-6" > 
    <Button variant="button" className="mt-4">Concert</Button>
    <Button variant="button" className="mt-4">Theatre</Button>
    <Button variant="button" className="mt-4">Comedy</Button>
    <Button variant="button" className="mt-4">Museum</Button>
 </div>


    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-8">
      {/* Render the "Create New Event" card as the first card */}
      <div className="flex flex-col items-center">
        <Card className="w-full h-full">
          <CardContent className="flex flex-col justify-center items-center text-center">
            <span className="text-2xl font-semibold">Create New Event</span>
            <Link to="/addEvent">
              <Button variant="button" className="mt-4">Create</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {events.map((event, index) => {
        if (index < 3) {
          return renderEventCard(event, index);
        }
        return null;
      })}

      <div className="md:col-span-3">
        {events
          .slice(3)
          .map((event, index) => renderEventCard(event, index + 3))}
      </div>
    </div>
    </>
  );
}

export default EventListPage;
