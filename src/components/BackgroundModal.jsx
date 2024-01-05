import React from "react";
import { UseContext } from "../context/UseContext";

const BackgroundModal = () => {
  const {
    modal,
    setModal,
    modalCart,
    setModalCart,
    modalUser,
    setModalUser,
    modalUserInfo,
    modalQR,
    setModalQR,
    modalAlert,
    setModalAlert,
  } = React.useContext(UseContext);
  return (
    <div
      className={
        modal ||
        modalCart ||
        modalUser ||
        modalUserInfo ||
        modalQR ||
        modalAlert
          ? "background-black"
          : "background-black-hide"
      }
      onClick={() => {
        setModalCart(false);
        setModalUser(false);
        setModal(false);
        setModalQR(false);
        setModalAlert(false);
      }}
    ></div>
  );
};

export default BackgroundModal;
