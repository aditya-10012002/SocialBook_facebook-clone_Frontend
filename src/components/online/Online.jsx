import { Link } from "react-router-dom";
import "./online.css";

export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <Link
        to={`/profile/${user.username}`}
        className="rightbarProfileImgContainer"
        style={{ textDecoration: "none" }}
      >
        <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </Link>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
