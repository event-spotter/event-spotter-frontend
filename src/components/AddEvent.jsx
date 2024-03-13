import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";

function AddEvent() {
  const API_URL = import.meta.env.VITE_API_URL;

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
  const [loading, setLoading] = useState(false);

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
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const allowedFormats = ["jpg", "jpeg", "png"];

    if (!allowedFormats.includes(fileExtension)) {
      alert("Allowed formats: jpg, jpeg, png");
      return;
    }
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    setLoading(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("response is: ", response);
        setImage(response.data.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleArtistSelection = (value) => {
    if (value === "new") {
      navigate("/addartist");
    } else {
      setSelectedArtist(value);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = (e) => {
    console.log("Form submitted");
    e.preventDefault();
    if (loading) return;

    const formattedDate = date
      ? new Date(date).toISOString()
      : new Date().toISOString();

    const requestBody = {
      image,
      title,
      artist: selectedArtist || null,
      description,
      category: category || null,
      location,
      date: formattedDate,
    };
    const storedToken = localStorage.getItem("authToken");
    console.log(requestBody);
    axios
      .post(`${API_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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
    <>
      <section className="text-center">
        <div>
          <h1 className="text-4xl text-sky-900 font-bold mt-24">
            Create Event
          </h1>
        </div>
      </section>

      <div className="p-6 pt-2 mb-32 mt-6 bg-[#d0e4ea] rounded-lg shadow-md flex flex-col h-3/5 relative w-full max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-4 pt-8 absolute py-2 shadow-sm"></div>
        <form onSubmit={handleSubmit} className="flex-col p-3 md:flex-row ">
          <div className="flex-col p-2 flex-grow">
            <label className="text-sky-900  text-left ml-1 -mb-2 text-l font-bold">
              Title:{" "}
            </label>
            <input
              className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              type="text"
              name="title"
              required
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex-col p-2 flex-grow">
            <label className="text-sky-900  text-left ml-1 -mb-2 text-l font-bold">
              Location:{" "}
            </label>
            <input
              className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              type="text"
              name="location"
              required
              placeholder="ABC"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex-col p-2" style={{ flexBasis: "48%" }}>
            <label className="text-sky-900  text-left ml-1 -mb-2 text-l font-bold">
              Artist:
            </label>
            <select
              className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              name="artist"
              required
              value={selectedArtist}
              onChange={(e) => handleArtistSelection(e.target.value)}
            >
              <option value="" disabled>
                Select an artist
              </option>
              <option value="new">Create new artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-col p-2" style={{ flexBasis: "50%" }}>
            <label className="text-sky-900  text-left ml-1 -mb-2 text-l font-bold">
              Category:
            </label>
            <select
              className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              name="category"
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select a category" disabled selected>
                Select a category
              </option>
              <option value="Concert">Concert</option>
              <option value="Theatre">Theatre</option>
              <option value="Comedy">Comedy</option>
              <option value="Museum">Museum</option>
            </select>
          </div>

          <div className="flex-col p-2">
            <label className="text-sky-900  text-left ml-1 -mb-2 text-l font-bold">
              Description:{" "}
            </label>
            <textarea
              className="resize-both text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              type="text"
              name="description"
              required
              placeholder="ABC"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex p-2 flex-col">
            <label className="text-sky-900 text-left text-l ml-1 font-bold">
              Date:{" "}
            </label>
            <DatePicker
              selected={date}
              onSelect={(newDate) => setDate(newDate)}
              onDateChanged={handleDateChange}
            />
          </div>

          <div className="flex-col p-2">
            <label className="text-sky-900  text-left ml-1 -mb-2 text-l font-bold">
              Image:{" "}
            </label>
            <input
              className="object-contain text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          {loading && <p>Image is loading...</p>}

          <div className="flex justify-center py-3">
            <Button variant="button" size="sm" disabled={loading}>
              Add
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddEvent;
