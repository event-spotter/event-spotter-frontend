import ExploreEvents from "../assets/explore_events.jpg";
import CreateEvent from "../assets/create_event.jpg";
import ExploreArtists from "../assets/explore_artists.jpg";

function HomePage() {

return (

    <div className="relative">
    <div className="relative inset-0 flex items-center justify-center">
      <img
        src={ExploreEvents}
        className="object-cover w-full h-52"
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div className="text-2xl mb-8">Explore Events</div>
      </div>
      </div>

      <div className="relative inset-0 flex items-center justify-center">
      <img
        src={CreateEvent}
        className="object-cover w-full h-52"
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div className="text-2xl mb-8">Create Event</div>
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
      
        <div className="text-2xl mb-8">Explore Artists</div>
      
      </div>
      </div>
   
    </div>


)

}

export default HomePage;