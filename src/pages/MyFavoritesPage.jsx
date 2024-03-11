import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FavoritesPage = () => {


  let favList = JSON.parse(localStorage.getItem("favorites"));
  const [favorites, setFavorites] = useState(favList!=null ? favList : [] );



  const removeFromFavorites = (event) => {
     if (favorites.findIndex((favorite) => favorite.id === event._id) > -1) {
        console.log("removing...");
        let newfavList = favorites.filter(
          (favorite) => favorite._id != event._id
        );
        setFavorites(newfavList);
        localStorage.setItem("favorites", JSON.stringify(newfavList));
    }  
  };
   

  return (
    <>
      <div className="DestinationsList">
        {favorites.length === 0 ? (
          <h2> <i> Favorites List is empty </i></h2>
        ) : (
          favorites.map((obj) => {
            return (
              <div className="destination-card" key={obj.id}>
                <div>
                  <Link to={`/destinations/${obj.id}`}>
                    <div className="destination-title-container">
                      <svg
                        className="location-tag"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <h2 className="destination-title">{obj.destination}</h2>
                    </div>
                    <img className="item-img" src={obj.image} />
                  </Link>
                </div>

                <div className="company-card-buttons-wrap">
                  <p className="destination-description">{obj.description} </p>
                  <button
                    onClick={() => {
                      removeFromFavorites(obj);
                    }}
                  >
                    <svg
                      className="like-tag"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
