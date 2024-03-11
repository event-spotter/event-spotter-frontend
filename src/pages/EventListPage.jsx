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
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        console.log(error);
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
      className="flex flex-col items-center my-8 mx-10"
    >
      <Card className={`w-64 md:w-80 ${isNewEvent ? "h-80" : "h-full"}`}>
        <CardContent className="flex flex-col justify-start items-center gap-2">
          {isNewEvent ? (
            <Link
              to="/addEvent"
              className="h-32 md:h-40 w-full rounded-lg object-cover p-3 bg-gray-200"
            >
              <span className="text-4xl text-gray-500">+</span>
            </Link>
          ) : (
            <img
              className="h-32 md:h-40 w-full rounded-lg object-contain pt-2"
              src={event.image}
              alt={event.title}
            />
          )}
          <div className="flex flex-col text-center">
            {isNewEvent ? (
              <span className="text-2xl font-semibold">Create New Event</span>
            ) : (
              <>
                <span className="text-xl font-semibold">{event.title}</span>
                <span className="text-lg">{event.category}</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
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
                  <Button variant="button" className="mx-2">
                    See details
                  </Button>
                </Link>
                <Button
                  variant="button"
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
      <div className="grid grid-cols-1 md:grid-cols-5 sm:gap-0 gap-12 mx-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 mx-48 mb-16">
        {filteredEvents.map((event, index) =>
          renderEventCard(event, index, index === 0)
        )}
      </div>
    </>
  );
}

export default EventListPage;
