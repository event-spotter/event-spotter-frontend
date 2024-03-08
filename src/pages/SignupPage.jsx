import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";
// const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);


  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleImage = (e) => {const file = e.target.files[0];
    setImage(file);
  };
  const handlePassword = (e) => setPassword(e.target.value);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
   axios.post(`${API_URL}/api/upload`, uploadData)
      .then(response => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImage(response.data.imageUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {name, email, password, image}

    console.log("form Data", formData)
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
  
      navigate("/auth/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSignupSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Sign Up
        </h3>

        <label
          htmlFor="name"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <label
          htmlFor="email"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <label
          htmlFor="image"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Image
        </label>
        <input 
        className="border rounded p-2 w-full mb-6"
        type="file" 
        onChange={(e) => handleFileUpload(e)} />
  

        <label
          htmlFor="password"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Already have an account?</p>
      <Link to={"/login"}> Log in</Link>
    </div>
  );
}

export default SignupPage;
