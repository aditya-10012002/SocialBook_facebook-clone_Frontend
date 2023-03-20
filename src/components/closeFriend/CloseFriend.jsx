import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`} className="sidebarFriendLink">
        <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
      </Link>
    </li>
  );
}
