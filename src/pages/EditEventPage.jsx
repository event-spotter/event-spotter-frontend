import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";
import { parseISO, format } from "date-fns";

const EditEventPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [artistList, setArtistList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);

  const { eventId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
        setLocation(response.data.location);
        setCategory(response.data.category);
        setDate(response.data.date);
        setSelectedArtist(response.data.artist);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });

    getArtist();
  }, [eventId]);


  const getArtist = () => {
    axios
      .get(`${API_URL}/api/artists`)
      .then((response) => {
        setArtistList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  };


  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImage(response.data.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = date ? new Date(date).toISOString() : new Date().toISOString();

    const newDetails = {
      image,
      title,
      artist: selectedArtist._id,
      description,
      category,
      location,
      date,
    };
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .put(`${API_URL}/api/events/${eventId}`, newDetails, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          navigate(`/events/${eventId}`);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className=" bg-[#d0e4ea] shadow-lg border-solid border rounded-xl w-3/5 h-4/5 flex-col p-4"
      >
        <div className="flex justify-between p-4">
          <label className="text-md">Title*: </label>
          <input
            className="text-md w-full ml-4"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-4">
          <label className="text-md">Artist: </label>

          {/* <input
            className="text-md w-full ml-4"
            type="text"
            name="artist"
            value={artist}
            onChange={(e) => setTitle(e.target.value)}
          /> */}

          <select
            className="text-md w-full ml-4"
            name="artist"
            required
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
          >
            <option value="" disabled>
              Select an artist
            </option>
            {artistList.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between p-4">
          <label className="text-md">Description: </label>
          <input
            className="text-md w-full ml-4"
            type="text"
            name="description"
            required
            placeholder="ABC"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-4">
          <label className="text-md">Location*: </label>
          <input
            className="text-md w-full ml-4"
            type="text"
            name="location"
            required
            placeholder="ABC"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-4">
          <label className="text-md">Category:</label>

          <select
            className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
            name="category"
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Concert">Concert</option>
            <option value="Theatre">Theatre</option>
            <option value="Comedy">Comedy</option>
            <option value="Museum">Musem</option>
          </select>
        </div>

        <div className="flex justify-between p-4">
          <label className="text-md">Image: </label>
          <input
            className="text-md w-full ml-4"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>

        <div className="flex justify-start p-4">
          <label className="text-md">Date: </label>
          <input
          className="mx-8"
          value={date ? format(new Date(date), "dd-MM-yyyy") : ""}
          readOnly />
          <DatePicker
            selected={date}
            onSelect={(newDate) => setDate(newDate)}
            onDateChanged={handleDateChange} 
          />
        </div>

        <div className="flex justify-center py-3">
          <Button variant="button" size="sm">
            Edit Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEventPage;
