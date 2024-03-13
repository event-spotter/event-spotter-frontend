import { useEffect, useState, useContext } from "react";
import axios from "axios";
import profileIcon from "../assets/profile-icon.png";
import loadingGif from "../assets/loading.gif";
import { AuthContext } from "../context/auth.context";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [image, setImage] = useState(profileIcon);

  const getUserProfile = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUserProfile(response.data);
          setImage(response.data.image);
          setLoading(false);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    } else {
      setErrorMessage("User not logged in");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [user._id, image]);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    setUploading(true);
    //setLoading(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        // response carries "fileUrl" which we can use to update the state
        setImage(response.data.imageUrl);
        //user put
        updateUserProfileImage(response.data.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        //setUploading(false);
      });
  };

  const updateUserProfileImage = (imageUrl) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const data = {
        image: imageUrl,
      };
      axios
        .put(`${API_URL}/api/users/${user._id}`, data, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // response carries "fileUrl" which we can use to update the state
          setImage(response.data.imageUrl);
          setUser(response.data);
          //user put
        })
        .catch((err) => console.log("Error while uploading the file: ", err))
        .finally(() => {
          setUploading(false);
        });
    }
  };

  if (errorMessage) return <div>{errorMessage}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="StudentDetailsPage bg-gray-100 py-6 px-4  flex flex-col items-center mt-20 m-2.5">
        <div className="bg-white p-16 rounded-lg shadow-md mb-6 flex flex-col items-center">
          {userProfile && (
            <>
              {/* <img className="w-32 h-32 rounded-full object-cover mb-4" src={student.image} alt="profile-photo" /> */}
              <img
                src={uploading ? loadingGif : image}
                alt="profile-photo"
                className="rounded-full w-32 h-32 border-2 border-gray-600  "
              />
              <div className="flex-col p-2">
                <input
                  className="text-md w-full object-contain"
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>
              {/* <h1 className="text-2xl mt-4 font-medium "> Name: {userProfile.name}</h1> */}
              <div className=" mt-14 mb-4 border-b pb-4">
                <p className="">
                  <strong>Name:</strong> {userProfile.name}
                </p>
              </div>

              <div className=" mb-4 border-b pb-4">
                <p className="">
                  <strong>Email:</strong> {userProfile.email}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className=" flex flex-row  justify-center m-5 ">
        <div className="flex justify-center py-10 mt-2.5 mx-5 h">
          <Link to={`/myFavoritesPage`}>
            <Button variant="button" size="lg">
              My Favorites
            </Button>
          </Link>
        </div>

        <div className="flex justify-center py-10 mt-2.5 mx-5 text-yellow-500 ">
          <Link to={`/myEventsPage`}>
            <Button variant="button" size="lg">
              My Events
            </Button>
          </Link>
        </div>

        {/* <div>
              
                <button
                  className="bg-[#0369a1] text-white cursor-pointer font-semibold text-[1em] ml-0 mr-[30px] mt-[30px] mb-0 p-[1em] rounded-md border-[none];
                            font-family: inherit"
                >
                  Edit Event
                </button>
           
            </div> */}
      </div>
    </div>
  );
}

export default ProfilePage;
