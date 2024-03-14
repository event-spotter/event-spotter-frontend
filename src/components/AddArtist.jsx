import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";
import { Link } from "react-router-dom";

function AddArtist() {
  const API_URL = import.meta.env.VITE_API_URL;

  const MAX_DESCRIPTION_LENGTH = 100;

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      image,
      name,
      description,
      genre,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/artists`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setImage("");
        setName("");
        setDescription("");
        setGenre("");
        navigate("/artists");
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          if (error.response.data.code === 11000 && error.response.data.keyPattern.name === 1) {
            alert("Error creating a new artis");
          } else {
            alert("Artist with this name already exists!t");
          }
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <section className="text-center">
        <div>
          <h1 className="text-4xl text-[rgb(38,71,94)] font-bold mt-24">
            Add Artist
          </h1>
        </div>
      </section>

      <div className="p-6 pt-2 mb-32 mt-6 bg-zinc-50 rounded-lg shadow-md flex flex-col h-3/5 relative w-full max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-4 pt-8 absolute py-2 shadow-sm"></div>
        <form onSubmit={handleSubmit} className="flex-col p-3 md:flex-row ">
            <div className="flex-col p-2 ">
              <label className="text-[rgb(38,71,94)]  text-left ml-1 -mb-2 text-l font-bold">Name*: </label>
              <input
                className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
                type="text"
                name="name"
                required
                placeholder="Artist Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex-col p-2 flex-grow">
              <label className="text-[rgb(38,71,94)]  text-left ml-1 -mb-2 text-l font-bold">Genre: </label>
              <input
                className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
                type="text"
                name="genre"
                required
                placeholder="Rock"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
         

          <div className="flex-col p-2">
            <label className="text-[rgb(38,71,94)]  text-left ml-1 -mb-2 text-l font-bold">
              Description (max 100 Characters):{" "}
            </label>
            <textarea
              className="text-md w-full resize-both border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              type="text"
              name="description"
              required
              placeholder="ABC"
              value={description}
              onChange={(e) => {
                const newDescription = e.target.value;
                if (newDescription.length <= MAX_DESCRIPTION_LENGTH) {
                  setDescription(newDescription);
                }
              }}
            />
            <p className="text-sm text-gray-500 mt-1">
              {`${description.length}/${MAX_DESCRIPTION_LENGTH} characters`}
            </p>
            {description.length > MAX_DESCRIPTION_LENGTH && (
              <p className="text-sm text-red-500">
                Description cannot exceed 100 characters.
              </p>
            )}
          </div>

          <div className="flex-col p-2">
            <label className="text-[rgb(38,71,94)]  text-left ml-1 -mb-2 text-l font-bold">Image: </label>
            <input
              className="text-md w-full object-contain border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          {loading && <p>Image is loading...</p>}

          <div className="flex justify-center py-3">
            <Button variant="button2" size="md" disabled={loading}>
              Add
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddArtist;
