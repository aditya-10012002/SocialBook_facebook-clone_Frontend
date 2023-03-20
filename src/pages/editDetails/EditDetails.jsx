import "./editDetails.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditDetails() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const desc = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();

  const editDetailsHandler = async (e) => {
    e.preventDefault();

    const descUser = desc.current.value.trim();
    const cityUser = city.current.value.trim();
    const fromUser = from.current.value.trim();
    const relationshipUser = relationship.current.value.trim();

    const userUpdate = {
      userId: user._id,
      desc: descUser !== "" ? descUser : user.desc ? user.desc : "",
      city: cityUser !== "" ? cityUser : user.city ? user.city : "",
      from: fromUser !== "" ? fromUser : user.from ? user.from : "",
      relationship: relationshipUser,
      // ? relationshipUser
      // : user.relationshipUser
      // ? user.relationshipUser
      // : null,
    };

    const payloadUserUpdate = {
      desc: userUpdate.desc,
      city: userUpdate.city,
      from: userUpdate.from,
      relationship: userUpdate.relationship,
    };

    console.log(userUpdate);
    console.log(payloadUserUpdate);

    try {
      await axios.put("/api/users/" + user._id, userUpdate);
      dispatch({
        type: "UPDATE_USER_DETAILS",
        payload: payloadUserUpdate,
      });
      navigate("/profile/" + user.username);
    } catch (err) {
      console.log("Error in EditDetails ", err);
    }
  };

  const backHandler = () => {
    navigate("/profile/" + user.username);
  };

  return (
    <>
      <Topbar />
      <div className="editDetails">
        <Sidebar />
        <div className="editDetailsWrapper">
          <div className="profileCover">
            <img src={user.coverPicture} alt="" className="profileCoverImg" />
            <div className="profileUserImgDiv">
              <img
                src={user.profilePicture}
                alt=""
                className="profileUserImg"
              />
            </div>
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
          </div>
          <div className="editDetailsBox">
            <div className="editDetailsImgDiv" />
            <form className="editDetailsForm" onSubmit={editDetailsHandler}>
              <div className="editDetailsUser">
                <h3 className="editDetailsHeading">Edit Details</h3>
                <div className="editDetailsUserDiv">
                  <label htmlFor="userDesc" className="userEditLabel">
                    Description
                  </label>
                  <input
                    placeholder={user.desc ? user.desc : "Add description"}
                    type="text"
                    className="userEdit"
                    id="userDesc"
                    ref={desc}
                  />
                </div>
                <div className="editDetailsUserDiv">
                  <label htmlFor="userCity" className="userEditLabel">
                    Current city
                  </label>
                  <input
                    placeholder={user.city ? user.city : "Add current city"}
                    type="text"
                    className="userEdit"
                    id="userCity"
                    ref={city}
                  />
                </div>
                <div className="editDetailsUserDiv">
                  <label htmlFor="userFrom" className="userEditLabel">
                    Native place
                  </label>
                  <input
                    placeholder={user.from ? user.from : "Add birth city"}
                    type="text"
                    className="userEdit"
                    id="userFrom"
                    ref={from}
                  />
                </div>
                <div className="editDetailsUserDiv">
                  <label htmlFor="userRelationship" className="userEditLabel">
                    Relationship status
                  </label>
                  <select
                    name="relationship"
                    id="userRelationship"
                    className="userEdit"
                    ref={relationship}
                    defaultValue={1}
                  >
                    <option value={1}>Single</option>
                    <option value={2}>Married</option>
                    <option value={3}>In a relationship</option>
                  </select>
                </div>
              </div>
              <div className="editDetailsUserBtnDiv">
                <button className="editDetailsUserBtn" onClick={backHandler}>
                  Cancel
                </button>
                <button className="editDetailsUserBtn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
