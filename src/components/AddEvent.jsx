import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";

function AddEvent() {
  const API_URL = "http://localhost:5005";

  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);



  useEffect(() => {
    axios
      .get(`${API_URL}/api/artists`)
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      image,
      title,
      artist: selectedArtist,
      description,
      category: category,
      location,
      date,
    };
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${API_URL}/api/events`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response.data);
        setImage("");
        setTitle("");
        setDescription("");
        setCategory("");
        setLocation("");
        setDate(null);
        navigate("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-sky-50 shadow-md border-solid border rounded-lg w-3/5 h-4/5 flex-col p-3 md:flex-row md:w-3/5"
      >
        <div className="flex p-2">
          <div className="flex-col p-2 flex-grow">
            <label className="text-md">Title*: </label>
            <input
              className="text-md w-full"
              type="text"
              name="title"
              required
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex-col p-2 flex-grow">
            <label className="text-md">Location*: </label>
            <input
              className="text-md w-full"
              type="text"
              name="location"
              required
              placeholder="ABC"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex p-2">
          <div className="flex-col p-2"  style={{ flexBasis: '48%' }}>
            <label className="text-md">Artist:</label>
            <select
              className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              name="artist"
              required
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
            >
              <option value="" disabled>
                Select an artist
              </option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-col p-2"  style={{ flexBasis: '50%' }}>
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
              <option value="Museum">Museum</option>
            </select>
          </div>
        </div>

        <div className="flex-col p-2">
          <label className="text-md">Description: </label>
          <textarea
            className="text-md w-full resize-both"
            type="text"
            name="description"
            required
            placeholder="ABC"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

       <div className="flex p-2 flex-col md:flex-row">
        <div className="flex-col p-2 flex-grow">
          <label className="text-md w-full">Date: </label>
          <DatePicker
            selected={date}
            onSelect={(newDate) => setDate(newDate)}
          />
        </div>

        <div className="flex-col p-2">
          <label className="text-md">Image: </label>
          <input
            className="text-md w-full object-contain"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        </div>

        <div className="flex justify-center py-3">
          <Button variant="button" size="sm">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddEvent;
