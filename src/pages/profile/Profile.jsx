import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";

export default function Profile() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState(currentUser.profilePicture);
  const [cover, setCover] = useState(currentUser.coverPicture);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCover, setIsLoadingCover] = useState(false);

  const username = useParams().username;

  const changeProfilePicture = async (f) => {
    setIsLoading(true);
    const userUpdate = {
      userId: currentUser._id,
    };

    if (f) {
      const data = new FormData();
      data.append("file", f);

      try {
        const imgPath = await axios.post("https://socialbook-api.cyclic.app/api/upload", data);
        userUpdate.profilePicture = imgPath.data;
        console.log("Profile picture uploaded");
      } catch (err) {
        console.log(err);
      }
      dispatch({
        type: "UPDATE_PROFILE_PICTURE",
        payload: userUpdate.profilePicture,
      });
      setProfile(userUpdate.profilePicture);
    }

    try {
      await axios.put("https://socialbook-api.cyclic.app/api/users/" + currentUser._id, userUpdate);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const changeCoverPicture = async (f) => {
    setIsLoadingCover(true);
    const userUpdate = {
      userId: currentUser._id,
    };

    if (f) {
      const data = new FormData();
      data.append("file", f);

      try {
        const imgPath = await axios.post("https://socialbook-api.cyclic.app/api/upload", data);
        userUpdate.coverPicture = imgPath.data;
        console.log("Cover picture uploaded");
      } catch (err) {
        console.log(err);
      }
      dispatch({
        type: "UPDATE_COVER_PICTURE",
        payload: userUpdate.coverPicture,
      });
      setCover(userUpdate.coverPicture);
    }

    try {
      await axios.put("https://socialbook-api.cyclic.app/api/users/" + currentUser._id, userUpdate);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setIsLoadingCover(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://socialbook-api.cyclic.app/api/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const CurrentUserProfile = () => {
    return (
      <div className="profileCover">
        {isLoadingCover && (
          <label
            htmlFor="cover"
            className="profileCoverImgDiv"
            style={{ cursor: "pointer" }}
          >
            <CircularProgress color="inherit" />
          </label>
        )}
        {!isLoadingCover && (
          <label
            htmlFor="cover"
            className="profileCoverImgDiv"
            style={{ cursor: "pointer" }}
          >
            <img src={cover} alt="" className="profileCoverImg" />
            <input
              style={{ display: "none" }}
              id="cover"
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => changeCoverPicture(e.target.files[0])}
            />
          </label>
        )}
        {isLoading && (
          <label
            htmlFor="profile"
            className="profileUserImgDiv"
            style={{ cursor: "pointer" }}
          >
            <CircularProgress color="inherit" />
          </label>
        )}
        {!isLoading && (
          <label
            htmlFor="profile"
            className="profileUserImgDiv"
            style={{ cursor: "pointer" }}
          >
            <img src={profile} alt="" className="profileUserImg" />
            <input
              style={{ display: "none" }}
              id="profile"
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => changeProfilePicture(e.target.files[0])}
            />
          </label>
        )}
      </div>
    );
  };

  const UserProfile = () => {
    return (
      <div className="profileCover">
        <img src={user.coverPicture} alt="" className="profileCoverImg" />
        <div className="profileUserImgDiv">
          <img src={user.profilePicture} alt="" className="profileUserImg" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            {user._id !== currentUser._id ? (
              <UserProfile />
            ) : (
              <CurrentUserProfile />
            )}
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
