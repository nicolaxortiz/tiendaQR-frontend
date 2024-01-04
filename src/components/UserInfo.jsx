import React from "react";
import { UseContext } from "../context/UseContext";
import { useAuth0 } from "@auth0/auth0-react";
import handBag from "../assets/handbag-svgrepo-com.svg";
import "../styles/userinfostyles.css";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const { modalUser } = React.useContext(UseContext);
  const { user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("my-purchases");
  };

  return (
    <div className={modalUser ? "container-user" : "container-user-hide"}>
      <img src={user?.picture} alt="profile-picture" className="userinfo-img" />
      <div className="title-userinfo">{user?.name}</div>

      <div className="box-options">
        <div className="purchases-option" onClick={handleNavigation}>
          <img src={handBag} alt="handBag" className="option-img" />
          <div className="option-txt">My purchases</div>
        </div>
      </div>

      <div
        className="btn-logout"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log out
      </div>
    </div>
  );
}

export default UserInfo;
