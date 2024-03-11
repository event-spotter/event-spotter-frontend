import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";
import { Link } from "react-router-dom";

function AddArtist() {
  const API_URL = "http://localhost:5005";

  const MAX_DESCRIPTION_LENGTH = 100;

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);


  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    setLoading(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImage(response.data.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setLoading(false)
      })
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
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-sky-50 shadow-md border-solid border rounded-lg w-3/5 h-3/5 flex-col p-3"
      >
        <div className="flex p-2">
          <div className="flex-col p-2 ">
            <label className="text-md">Name*: </label>
            <input
              className="text-md w-full"
              type="text"
              name="name"
              required
              placeholder="Artist Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex-col p-2 flex-grow">
            <label className="text-md">Genre: </label>
            <input
              className="text-md w-full"
              type="text"
              name="genre"
              required
              placeholder="Rock"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
        </div>


        <div className="flex-col p-2">
          <label className="text-md">Description (max 100 Characters): </label>
          <textarea
            className="text-md w-full resize-both"
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
            <label className="text-md">Image: </label>
            <input
              className="text-md w-full object-contain"
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
  );
}
export default AddArtist;
