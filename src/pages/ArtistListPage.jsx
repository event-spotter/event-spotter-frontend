import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaTrashCan } from "react-icons/fa6";

function ArtistListPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);

  const getAllArtists = () => {
    axios
      .get(`${API_URL}/api/artists`)
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  const storedToken = localStorage.getItem("authToken");
  
  const deleteArtist = (artistId) => {
    axios
      .delete(`${API_URL}/api/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const newArtist = artists.filter(
          (artistObj) => artistObj._id !== artistId
        );
        setArtists(newArtist);
        setFilteredArtists(newArtist);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderArtistCard = (artist, index, isNewArtist = false) => (
      <div key={`${artist.id}-${index}`} className="flex flex-col items-center my-10 mx-10">

      <Card className={`w-64 md:w-80 ${isNewArtist ? "h-full" : "h-full"}`}>
          <CardContent className="flex flex-col items-center gap-6 bg-[color:var(--light-grey)]">
          {isNewArtist ? (
            <Link
              to="/addArtist"
              className="h-32 md:h-56 w-full rounded-lg object-cover p-3 bg-gray-200 m-0"
            >
              <span className="flex justify-center items-center text-8xl text-gray-500" style={{ height: "100%" }} >
                +
              </span>
            </Link>
          ) : (
            <img
              className="h-56 w-full rounded-lg object-cover m-0"
              src={artist.image}
              alt={artist.title}
            />
            )}
            <div className="flex flex-col text-center">
            {isNewArtist ? (
              <span className="text-2xl font-semibold">Create New Artist</span>
            ) : (
              <>
              <span className="text-xl font-semibold pb-4">{artist.name}</span>
              <span className="text-lg pb-4">{artist.genre}</span>
              <span className="text-lg pb-4">{artist.description}</span>
              </>
            )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center mb-1">
            <div className="flex">
            {isNewArtist ? (
              <Link to="/addArtist">
                <Button variant="button" className="mt-4">
                  Create
                </Button>
              </Link>
            ) : (
              <>
              <Button
                variant="button"
                onClick={() => {
                  deleteArtist(artist._id);
                }}
              >
                <FaTrashCan className="text-md" />
              </Button>
              </>
            )}
            </div>
          </CardFooter>
        </Card>
      </div>
    );


  return (
    <>
   
    <div className="grid grid-cols-1 md:grid-cols-3 mx-48 mb-16">
      <div className="col-span-3 md:col-span-1 mx-10">
        {renderArtistCard({}, 0, true)}
      </div>

    
      {artists.map((artist, index) => (
        <div key={index} className="col-span-3 md:col-span-1 mx-10">
          {renderArtistCard(artist, index)}
        </div>
      ))}
   </div>
    </>
  );
}

export default ArtistListPage;
