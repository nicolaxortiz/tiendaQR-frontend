import React from "react";
import { UseContext } from "../context/UseContext";
import { useAuth0 } from "@auth0/auth0-react";
import logOutLogo from "../assets/logout-2-svgrepo-com.svg";
import handBag from "../assets/handbag-svgrepo-com.svg";
import "../styles/userinfostyles.css";

function UserInfo() {
  const { modalUser } = React.useContext(UseContext);
  const { user, logout } = useAuth0();

  return (
    <div className={modalUser ? "container-user" : "container-user-hide"}>
      <img src={user?.picture} alt="profile-picture" className="userinfo-img" />
      <div className="title-userinfo">{user?.name}</div>
      <div className="box-options">
        <div className="purchases-option">
          <img src={handBag} alt="handBag" className="option-img" />
          <div className="option-txt">Mis compras</div>
        </div>
      </div>
      <div
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Cerrar sesión
      </div>
    </div>
  );
}

export default UserInfo;
