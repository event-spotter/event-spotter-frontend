import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../context/auth.context";
import FavoritesButton from "../components/FavoritesButton";

const FavoritesPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([]); 
  const storedToken = localStorage.getItem("authToken");


  const getMyFavorites = () => {
    axios
      .get(`${API_URL}/api/events/favorites`, {
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
    getMyFavorites();
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
      key={`${event._id}`}
      id={`${event._id}`}
      className="flex flex-col items-center my-8 mx-10"
    >
      <Card className={`w-64 md:w-80 ${isNewEvent ? "h-100" : "h-full"}`}>
      <CardContent className="flex flex-col items-center gap-6 bg-[color:var(--light-grey)] ">
             <img
              className="h-56 w-full object-cover m-0"
              src={event.image}
              alt={event.title}
            />
          
          <div className="flex flex-col text-center">
            
                <span className="text-xl font-semibold pb-4">
                  {event.title}
                </span>
                <span className="text-lg pb-4">{event.category}</span>
              
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center mb-1">
          <div className="flex">
            
              <>
                <Link to={`/events/${event._id}`}>
                  <Button variant="button" className="mx-1">
                    See details
                  </Button>
                </Link>

                <FavoritesButton eventId={event._id} removeCard={true} />

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
           
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <>
    {events && events.length>0 ? (
      <>
    <h1 className="flex text-4xl text-[rgb(38,71,94)] font-bold mb-4 mt-32 justify-center"> My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-48 mb-16">
        { events.map((event, index) => renderEventCard(event, index, false))}
      </div>
      </>
      ) : 
      (<h1 className="flex text-4xl text-sky-900 font-bold mb-4 mt-40 justify-center"> Your Favorite List is empty</h1>)
      }
    </>
  );
   
};

export default FavoritesPage;
