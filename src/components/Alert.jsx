import React from "react";
import "../styles/alertstyle.css";
import { UseContext } from "../context/UseContext";
import axios from "axios";
import AlertIcon from "../assets/alert-2-svgrepo-com.svg";

const Alert = () => {
  const {
    modalAlert,
    setModalAlert,
    setModalCart,
    cart,
    setCart,
    cartId,
    userInformation,
  } = React.useContext(UseContext);

  const [loading, setLoading] = React.useState(false);

  const onHandleCancel = () => {
    setModalAlert(false);
  };

  const handlePurchase = async () => {
    if (cart.length > 0) {
      setTimeout(async () => {
        try {
          const response = await axios.post(
            "http://localhost:3900/api/purchase/save",
            {
              user_id: userInformation._id,
              products: cart,
            }
          );

          if (response.status === 200) {
            try {
              const response = await axios.patch(
                "http://localhost:3900/api/cart/updateCart",
                { products: [], cart_id: cartId }
              );
              setCart([]);
              setModalCart(false);
              setModalAlert(false);
            } catch (error) {}
          }
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    } else {
      setModalCart(false);
    }
  };

  return (
    <div className={modalAlert ? "alert-box" : "alert-box-hide"}>
      <img src={AlertIcon} />
      <div className="txt-modal">Are you sure to finalize your purchase?</div>

      <div className="options-modal">
        <div
          className="fs-opt"
          onClick={() => {
            setLoading(true);
            handlePurchase();
          }}
        >
          {loading ? <div className="spinner"></div> : "Yes"}
        </div>
        <div
          className="sc-opt"
          onClick={() => {
            onHandleCancel();
          }}
        >
          No
        </div>
      </div>
    </div>
  );
};

export default Alert;
