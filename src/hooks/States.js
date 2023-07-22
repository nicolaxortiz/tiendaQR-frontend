import React from "react";

const States = () => {
  const [product, setProduct] = React.useState();
  const [modal, setModal] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [modalCart, setModalCart] = React.useState(false);
  const [cartId, setCartId] = React.useState();
  const [modalUser, setModalUser] = React.useState(false);
  const [modalUserInfo, setModalUserInfo] = React.useState(false);
  const [userInformation, setUserInformation] = React.useState({});

  return {
    product,
    setProduct,
    modal,
    setModal,
    cart,
    setCart,
    modalCart,
    cartId,
    setCartId,
    setModalCart,
    modalUser,
    setModalUser,
    modalUserInfo,
    setModalUserInfo,
    userInformation,
    setUserInformation,
  };
};

export default States;
