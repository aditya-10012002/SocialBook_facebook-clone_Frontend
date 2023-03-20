import "./sidebar.css";
import {
  Bookmark,
  Chat,
  DynamicFeed,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  School,
  WorkOutline,
} from "@mui/icons-material";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await axios.get("/api/users/all");
        setAllUsers(allUsers.data);
      } catch (err) {
        console.log("Sidebar error");
      }
    };
      getAllUsers();
  }, []);

  const signoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <DynamicFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>

        <button className="sidebarButton" onClick={signoutHandler}>
          Sign out
        </button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {allUsers.map((user) => (
            <CloseFriend key={user._id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}
