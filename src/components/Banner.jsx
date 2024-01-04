import React from "react";
import "../styles/bannerstyle.css";
import cartSVG from "../assets/shop-svgrepo-com.svg";
import logo from "../assets/logo-android-google-2-svgrepo-com.svg";
import userLogo from "../assets/user-svgrepo-com.svg";
import qrLogo from "../assets/qr-scan-svgrepo-com.svg";
import axios from "axios";
import { UseContext } from "../context/UseContext";
import { useAuth0 } from "@auth0/auth0-react";

const Banner = () => {
  const {
    cart,
    setCart,
    setCartId,
    modalCart,
    setModalCart,
    modalUser,
    setModalUser,
    setModalUserInfo,
    setUserInformation,
    modalQR,
    setModalQR,
  } = React.useContext(UseContext);

  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const openCart = () => {
    setModalCart(!modalCart);
    if (modalUser || modalQR) {
      setModalUser(false);
      setModalQR(false);
    }
  };

  const openUserMenu = () => {
    setModalUser(!modalUser);
    if (modalCart || modalQR) {
      setModalCart(false);
      setModalQR(false);
    }
  };

  const openQR = () => {
    setModalQR(!modalQR);
    if (modalUser || modalCart) {
      setModalUser(false);
      setModalCart(false);
    }
  };

  const fetchCart = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3900/api/cart/getCart",
        { user_id: id }
      );
      //traemos el carrito de la db
      if (response.status === 200) {
        setCart(response.data.getCart.products);
        setCartId(response.data.getCart._id);
        //creacion del carrito en caso de no existir en la db
      }
    } catch (error) {
      if (error.response.status === 404) {
        try {
          const response = await axios.post(
            "http://localhost:3900/api/cart/save",
            { user_id: id, products: [] }
          );
          setCart(response.data.getCart.products);
          setCartId(response.data.getCart._id);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  React.useEffect(() => {
    async function fetchUser() {
      if (isAuthenticated) {
        try {
          const response = await axios.post(
            "http://localhost:3900/api/user/getbyEmail",
            { email: user?.email }
          );
          if (response.status === 200) {
            setUserInformation(response.data.user);
            fetchCart(response.data.user._id);
          }
        } catch (error) {
          setModalUserInfo(true);
        }
      }
    }
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <div className="container">
        <div className="banner">
          Shoes Store
          <img
            src={logo}
            width="30px"
            height="100%"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="shopping-cart">
          {isAuthenticated ? (
            <img
              src={user.picture}
              alt={user.nickname}
              className="user-img"
              onClick={() => {
                openUserMenu();
              }}
            />
          ) : (
            <img
              src={userLogo}
              alt=""
              className="user-img"
              onClick={() => loginWithRedirect()}
            />
          )}

          <img
            src={qrLogo}
            alg="qr-icon"
            width="30px"
            height="100%"
            onClick={() => {
              openQR();
            }}
          />

          <img
            src={cartSVG}
            width="30px"
            height="100%"
            alt="shoping-cart"
            onClick={() => {
              openCart();
            }}
          />
          <div className="quantity">{cart.length}</div>
        </div>
      </div>
    </>
  );
};

export { Banner };
