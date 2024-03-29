import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, password, image };

    console.log("form Data", formData);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);

      navigate("/auth/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="p-6 pt-2 mb-32 mt-24  bg-zinc-50 rounded-lg shadow-md flex flex-col h-3/5 relative w-full max-w-3xl mx-auto">
    <div className="flex justify-center items-center mb-4 pt-8 absolute py-2 shadow-sm"></div>
      <form
        onSubmit={handleSignupSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-6 px-2"
      >
        <h3 className="text-2xl text-[rgb(38,71,94)] font-bold mb-6 sticky left-0">
          Sign Up
        </h3>

        <label
          htmlFor="name"
          className="text-[rgb(38,71,94)]  text-left ml-1 -mb-2 text-l font-bold"
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
          className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          autoComplete="off"
        />

        <label
          htmlFor="email"
          className="text-[rgb(38,71,94)] text-left ml-1 -mb-2 text-l font-bold"
        >
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          autoComplete="off"
        />

        <label
          htmlFor="password"
          className="text-[rgb(38,71,94)]  text-left ml-1 -mb-2 text-l font-bold"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="text-md w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          autoComplete="off"
        />

        <div className="flex justify-center py-3">
          <Button variant="button2" size="md">
           Sign Up
          </Button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="mb-4 text-left ml-3 text-l">
      <p className="mt-10 mb-2 ">Already have an account?</p>
      <Link to={"/auth/login"} className=" font-bold"> Log in</Link>
    </div>
    </div>
  );
}

export default SignupPage;
