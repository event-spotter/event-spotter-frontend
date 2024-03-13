import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function FavoritesButton({eventId,index}) {
  const storedToken = localStorage.getItem("authToken");

  const [favorites, setFavorites] = useState([]);

  const { isLoggedIn, isLoading, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const addToFavorites = (eventId) => {
    if (favorites.includes(eventId)) {
      //remove
      removeFromFavorites(eventId);
    } else {
      //add
      axios
        .get(`${API_URL}/api/users/favorites/${eventId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setFavorites(response.data.favoriteEvents);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeCard = () => document.getElementById(`${eventId}-${index}`).remove();


  const removeFromFavorites = (eventId) => {
    axios
      .delete(`${API_URL}/api/users/favorites/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavorites(response.data.favoriteEvents);
        if(index){
          removeCard()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        setFavorites(user.favoriteEvents);
      }
    }
  }, [isLoading, isLoggedIn]);

  return (
    <Button
      variant="button"
      className="mx-1"
      onClick={() => {
        isLoggedIn ? addToFavorites(eventId) : navigate("/auth/login");
      }}
    >
      {isLoggedIn && favorites.includes(eventId) ? (
        <VscHeartFilled className="text-md" />
      ) : (
        <VscHeart className="text-md" />
      )}
    </Button>
  );
}

export default FavoritesButton;
