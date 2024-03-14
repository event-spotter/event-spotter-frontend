import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const EventDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        console.log(response);
        setEvent(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [eventId]);


  return (
    <div className="px-[5vw] py-0 mt-[110px] mb-32">
      {event === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-[50px] mb-[30px]">
          <div className="basis-6/12 ">
            <img
              className="h-full w-full object-cover shadow-[#3c40434d_0_2px_2px,#3c404326_0_1px_3px_1px] rounded-[50px]"
              src={event.image}
            />
          </div>
          <div className="basis-6/12">
            <div className="border-b-[#f2f2f2] border-b border-solid">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-[2.95em] text-[rgba(0,0,0,0.87)] tracking-wider m-0 ">
                    {event.title}
                  </h1>{" "}
                </div>
              
              </div>
            
            </div>
            <div className="flex justify-between  bg-zinc-100 mt-4 mb-5 pt-5 pb-0 px-5 rounded-[10px]">
              <div className="basis-[70%]">
                <h5 className="text-[large] tracking-wide font-semibold leading-[1.2] text-[color:var(--bs-heading-color)] mt-0 mb-2">
                  Artist
                </h5>
                <div>
                  <p className="mt-0 mb-4"> {event.artist.name} </p>
                </div>
                <h5 className="text-[large] tracking-wide font-semibold leading-[1.2] text-[color:var(--bs-heading-color)] mt-0 mb-2">
                  Description
                </h5>
                <div>
                  <p className="mt-0 mb-4"> {event.description} </p>
                </div>
                <h5 className="text-[large] tracking-wide font-semibold leading-[1.2] text-[color:var(--bs-heading-color)] mt-0 mb-2">
                  Category
                </h5>
                <div>
                  <p className="mt-0 mb-4">{event.category} </p>
                </div>
                <h5 className="text-[large] tracking-wide font-semibold leading-[1.2] text-[color:var(--bs-heading-color)] mt-0 mb-2">
                  Location
                </h5>
                <div>
                  <p className="mt-0 mb-4">{event.location} </p>
                </div>
                <h5 className="text-[large] tracking-wide font-semibold leading-[1.2] text-[color:var(--bs-heading-color)] mt-0 mb-2">
                  Date
                </h5>
                <div>
                <p className="mt-0 mb-4">{event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}</p> 
                </div>
              </div>
            </div>

            <div>
              <Link to={`/events/edit/${eventId}`}>
              <Button
                  variant="button2"
                >
                  Edit Event
                  </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails
