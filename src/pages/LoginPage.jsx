import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response?.data?.authToken);

        storeToken(response?.data?.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error.response.status, error.response.data)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="px-8 mb-32 mt-8 bg-sky-50 rounded-lg shadow-md flex flex-col h-3/5 relative w-full max-w-3xl mx-auto">
    <div className="flex justify-center items-center mb-4 pt-8 absolute  py-2 shadow-sm"></div>
      <form
        onSubmit={handleLoginSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl  text-sky-900 font-bold mb-6 sticky left-0">
          Login
        </h3>

        <label
          htmlFor="email"
          className="text-sky-900 text-left ml-1 -mb-2 text-l font-bold"
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
          htmlFor="password"
          className="text-sky-900 text-left ml-1 -mb-2 text-l font-bold"
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

<div className="flex justify-center py-3">
            <Button variant="button" size="sm">
              Log in
            </Button>
          </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Don&apos;t have an account yet?</p>
      <Link to={"/auth/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
