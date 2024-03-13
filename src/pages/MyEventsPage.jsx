import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaTrashCan } from "react-icons/fa6";
import { VscHeartFilled } from "react-icons/vsc";
import { AuthContext } from "../context/auth.context";

function MyEventsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([]); 
  const storedToken = localStorage.getItem("authToken");


  const getMyEvents = () => {
    axios
      .get(`${API_URL}/api/events/user/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  const deleteEvent = (eventId) => {
    axios
      .delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const newEvent = events.filter((eventObj) => eventObj._id !== eventId);
        setEvents(newEvent);
        setFilteredEvents(newEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  const renderEventCard = (event, index, isNewEvent = false) => (
    <div
      key={`${event.id}-${index}`}
      className="flex flex-col items-center my-10 mx-10"
    >
      <Card className={`w-64 md:w-80  ${isNewEvent ? "h-100" : "h-full"}`}>
        <CardContent className="flex flex-col items-center gap-6 bg-[color:var(--light-grey)] ">
          {isNewEvent ? (
            <Link
              to="/addEvent"
              className="h-32 md:h-56 w-full rounded-lg object-cover p-3 bg-gray-200 m-0"
            >
              <span
                className="flex justify-center items-center text-8xl text-gray-500"
                style={{ height: "100%" }}
              >
                +
              </span>
            </Link>
          ) : (
            <img
              className="h-56 w-full rounded-lg object-cover m-0"
              src={event.image}
              alt={event.title}
            />
          )}
          <div className="flex flex-col text-center">
            {isNewEvent ? (
              <span className="text-2xl font-semibold">Create New Event</span>
            ) : (
              <>
                <span className="text-xl font-semibold pb-4">
                  {event.title}
                </span>
                <span className="text-lg pb-4">{event.category}</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center mb-1">
          <div className="flex">
            {isNewEvent ? (
              <Link to="/addEvent">
                <Button variant="button" className="mt-4">
                  Create
                </Button>
              </Link>
            ) : (
              <>
                <Link to={`/events/${event._id}`}>
                  <Button variant="button" className="mx-1">
                    See details
                  </Button>
                </Link>

               

                <Button
                  variant="button"
                  className="mx-1"
                  onClick={() => {
                    deleteEvent(event._id);
                  }}
                >
                  <FaTrashCan className="text-md" />
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <>
    <h1 className="flex text-4xl text-sky-900 font-bold mb-4 mt-28 justify-center"> My Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-48 mb-16">
        {events.map((event, index) => renderEventCard(event, index, false))}
      </div>
    </>
  );
}

export default MyEventsPage;

//  <img className="h-32 md:h-40 w-full rounded-lg object-contain pt-2" >
