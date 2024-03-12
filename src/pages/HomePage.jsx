
import ExploreEvents from "../assets/explore_events.jpg";
import CreateEvent from "../assets/create_event.jpg";
import ExploreArtists from "../assets/explore_artists.jpg";
import HandsUp from "../assets/hands-up.jpg";
import Events from "../assets/dashboard_bg.jpg";
import { Link } from "react-router-dom";

function HomePage() {

return (

    <div className="relative">
    <div className="relative inset-0 flex items-center justify-center">
      <img
        src={ CreateEvent}
        className="object-cover w-full h-52"
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <Link to={"/events"} className="font-extrabold  font-sans shadow-md text-2xl mb-8 text-yellow-300 hover:text-sky-900 ">Explore Events</Link>
      </div>
      </div>

      <div className="relative inset-0 flex items-center justify-center">
      <img
        src={HandsUp}
        className="object-cover w-full h-52"
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <Link to={"/addEvent"} className="font-extrabold font-sans text-2xl mb-8 text-yellow-300 hover:text-red-800">Create Event</Link>
      </div>
      </div>

      <div className="relative inset-0 flex items-center justify-center">
      <img
        src={ExploreArtists}
        className="object-cover w-full h-52"
        style={{ objectPosition: '50% 10%' }}
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
      
        <Link to={"/artists"} className="font-extrabold  font-sans shadow-md text-2xl mb-8 text-yellow-300 hover:text-red-800">Explore Artists</Link>
      
      </div>
      </div>
   
    </div>


)

}

export default HomePage;




/*
import "../App.css";
import itinerariesPic from '../assets/explore_events.jpg'
import plan from '../assets/explore_artists.jpg'
import travelTips from '../assets/create_event.jpg'
import ComplexButton from "../components/ComplexButton";
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div style={{flex:1}}>

      <div style={{height: '34%'}}>
        <Link to='/itineraries'>
          <ComplexButton 
            title='Explore itineraries'
            imageUrl={itinerariesPic}
          />
        </Link>
      </div>

      <div style={{height: '33%'}}>
      <Link to='/new-itinerary'>
        <ComplexButton 
          title='Create an itinerary'
          imageUrl={plan}
        />
      </Link>
      </div>

      <div style={{height: '33%'}}>
      <Link to='/traveltips'>
        <ComplexButton 
          title='Explore travel tips'
          imageUrl={travelTips}
        />
      </Link>
      </div>

    </div>
  );
}

export default Home;
*/