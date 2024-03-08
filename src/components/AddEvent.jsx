import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";

function AddEvent() {
  const API_URL = "http://localhost:5005";

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      image,
      title,
      artist,
      description,
      category,
      location,
      date,
    };
    // const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${API_URL}/api/events`, requestBody)
      // { headers: { Authorization: `Bearer ${storedToken}` } }
      .then((response) => {
        console.log(response.data);
        setImage("");
        setTitle("");
        setArtist("");
        setDescription("");
        setCategory([]);
        setLocation("");
        setDate(null);
        navigate("/api/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className=" bg-sky-100 shadow-lg border-solid border rounded-xl w-3/5 h-94 flex-col p-4"
      >
        <div className="flex justify-between p-1">
          <label className="text-sm">Image: </label>
          <input
            className="text-sm w-full ml-4"
            type="url"
            name="image"
            placeholder="Event Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-1">
          <label className="text-sm">Title: </label>
          <input
            className="text-sm w-full ml-4"
            type="text"
            name="title"
            required
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-1">
          <label className="text-sm">Artist: </label>
          <input
            className="text-sm w-full ml-4"
            type="text"
            name="artist"
            required
            placeholder="Pearl Jam"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-1">
          <label className="text-sm">Description: </label>
          <input
            className="text-sm w-full ml-4"
            type="text"
            name="description"
            required
            placeholder="ABC"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-between p-1">
          <label className="text-sm">Location: </label>
          <input
            className="text-sm w-full ml-4"
            type="text"
            name="location"
            required
            placeholder="ABC"
            value={location}
            onChange={(e) => setCategory(e.target.value)}
          />
          </div>

        <div className="flex justify-between p-1">
          <label className="text-sm">Category:</label>

          <select
            className="text-sm w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
            type="text"
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

          <div className="flex justify-between gap-8 p-1">
            <label className="text-sm">Date: </label>
            <DatePicker
              selected={date}
              onSelect={(newDate) => setDate(newDate)}
            />
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
