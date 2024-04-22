import Avatar from "@mui/material/Avatar";
// import getUserInfo from "../../apis/UserInfoAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/modules/UserInfoAPI";
import "../../assets/css/userinfo.css";
import Button from "@mui/material/Button";
import { SettingOutlined } from "@ant-design/icons";
import { appState } from "../../appState";

export default function UserDetails() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  // async function retrieveUserinfo() {
  //   const userInfoResponse = await getUserInfo();
  //   if ("username" in userInfoResponse) {
  //     // userInfoResponse is of type userInfo, so we can safely access its properties
  //     setUsername(userInfoResponse.username);
  //   } else {
  //     console.error("An error occurred:", userInfoResponse.errorMessage);
  //   }
  // }

  // retrieveUserinfo();

  return (
    <div>
      <div className="user-container">
        <div className="user-avatar">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {appState.userName[0].toUpperCase()}
          </Avatar>
        </div>
        <div className="userinfo-content">
          <p className="username"> Username: {appState.userName}</p>
          <p className="user_id">User_ID: {appState.userId}</p>
        </div>
        <SettingOutlined className="settings" />
      </div>
    </div>
  );
}
