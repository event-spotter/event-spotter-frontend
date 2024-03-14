import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import FavoritesButton from "../components/FavoritesButton";

function EventListPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [events, setEvents] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

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

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const storedToken = localStorage.getItem("authToken");

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
        if (error.response.status === 404) {
          alert("Event not found"); 
        } else if (error.response.status === 401) {
          alert("YYou are not the owner and are not allowed to delete this event."); 
        } else {
          console.log(error);
          alert("An error occurred while deleting the event"); 
        }
      });
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All Events") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
    }
  };

  const renderEventCard = (event, index, isNewEvent = false) => (
    <div
      key={`${event.id}-${index}`}
      className="flex flex-col items-center my-10 mx-10"
    >
      <Card className={`w-64 md:w-80 ${isNewEvent ? "h-100" : "h-full"}`}>
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

                <FavoritesButton eventId={event._id} />

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
  if (isLoading) return <p>Loading ...</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 sm:gap-0 gap-10 mx-8 mt-20">
        <Button
          variant="button"
          className={`mt-4 md: m-2 ${
            selectedCategory === "All Events" && "bg-blue-500"
          }`}
          onClick={() => handleCategoryFilter("All Events")}
        >
          All Events
        </Button>
        <Button
          variant="button"
          className={`mt-4 md: m-2 ${
            selectedCategory === "Concert" && "bg-blue-500"
          }`}
          onClick={() => handleCategoryFilter("Concert")}
        >
          Concert
        </Button>

        <Button
          variant="button"
          className={`mt-4 md: m-2 ${
            selectedCategory === "Theatre" && "bg-blue-500"
          }`}
          onClick={() => handleCategoryFilter("Theatre")}
        >
          Theatre
        </Button>

        <Button
          variant="button"
          className={`mt-4 md: m-2 ${
            selectedCategory === "Comedy" && "bg-blue-500"
          }`}
          onClick={() => handleCategoryFilter("Comedy")}
        >
          Comedy
        </Button>
        <Button
          variant="button"
          className={`mt-4 md: m-2 ${
            selectedCategory === "Museum" && "bg-blue-500"
          }`}
          onClick={() => handleCategoryFilter("Museum")}
        >
          Museum
        </Button>
      </div>

      {/* Render "Create New Event" card */}
      <div className="grid grid-cols-1 md:grid-cols-3 mx-48 mb-16">
        <div className="col-span-3 md:col-span-1 mx-10">
          {renderEventCard({}, 0, true)}
        </div>

        {/* Render other events */}
        {filteredEvents.map((event, index) => (
          <div key={index} className="col-span-3 md:col-span-1 mx-10">
            {renderEventCard(event, index)}
          </div>
        ))}
      </div>
    </>
  );
}

export default EventListPage;
