import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaTrashCan } from "react-icons/fa6";

function ArtistListPage() {
  const API_URL = "http://localhost:5005";

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

  const renderArtistCard = (artist, index) => {
    return (
      <div key={`${artist.id}-${index}`} className="flex flex-col items-center">
        <Card className="w-full h-full">
          <CardContent className="flex flex-col justify-start items-center gap-2">
            <img
              className="h-56 w-full rounded-lg object-cover p-3"
              src={artist.image}
              alt={artist.title}
            />
            <div className="flex flex-col text-center">
              <span className="text-xl font-semibold ">{artist.name}</span>
              <span className="text-lg">{artist.genre}</span>
            </div>
          </CardContent>
          <CardFooter className="flex  justify-center items-center">
            <div className="flex">
              <Link to={`/artists/${artist._id}`}>
                <Button variant="button" className="mx-2">
                  See details
                </Button>
              </Link>
              <Button
                variant="button"
                onClick={() => {
                  deleteArtist(artist._id);
                }}
              >
                <FaTrashCan className="text-md" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-8">
        {/* Render the "Create New artist" card as the first card */}
        <div className="flex flex-col items-center">
          <Card className="w-full h-full">
            <CardContent className="flex flex-col justify-center items-center text-center">
              <span className="text-2xl font-semibold">Create New artist</span>
              <Link to="/addartist">
                <Button variant="button" className="mt-4">
                  Create
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {artists.map((artist, index) => renderArtistCard(artist, index))}
      </div>
    </>
  );
}

export default ArtistListPage;
