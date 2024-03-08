import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";



const EventDetails = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const { eventId } = useParams()
    const navigate = useNavigate()
    const [event, setEvent] = useState(null)
    


    useEffect(() => {
       axios.get(`${API_URL}/api/events/${eventId}`)
            .then((response) => {
                console.log(response);
                setEvent(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [eventId])

   

    return (
        <div className="EventDetails">

                                <h5>Title</h5>
                                <div><p> {Event.title}</p></div>
                                <h5>Description</h5>
                                <div><p>{Event.description}</p></div>
                                <h5>Category</h5>
                                <div><p> {Event.category}</p></div>
                                <h5>Location</h5>
                                <div><p> {Event.location}</p></div>
            {/* {event === null
                ? <p>Loading...</p>
                : (<div className="event">
                    <div className="img-card">
                        <img src={event.image} />
                    </div>
                        <div>
                            <div >
                               <h5>Title</h5>
                                <div><p> {Event.title}</p></div>
                                <h5>Description</h5>
                                <div><p>{Event.description}</p></div>
                                <h5>Category</h5>
                                <div><p> {Event.category}</p></div>
                                <h5>Location</h5>
                                <div><p> {Event.location}</p></div>
                            </div>

                        </div>
                        {/* <div className="buttons-wrap">
                            <Link to={`/events/edit/${eventId}`}><button>Edit Destination</button></Link>
                            <button onClick={deleteProject}>Delete Destination</button>
                        </div> 
                    </div>
                </div>)
            } */}
        </div>
    );
}

export default EventDetails;

