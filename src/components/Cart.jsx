import React from "react";
import { UseContext } from "../context/UseContext";
import "../styles/cartstyle.css";
import { ProductCart } from "./ProductCart";
import axios from "axios";

const Cart = () => {
  const { modalCart, setModalCart, setModalAlert, cart, cartId } =
    React.useContext(UseContext);
  const total = cart?.reduce((acc, item) => acc + item.price, 0);

  React.useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.patch(
          "http://localhost:3900/api/cart/updateCart",
          {
            cart_id: cartId,
            products: cart,
          }
        );
      } catch (error) {}
    }
    fetchCart();
  }, [cart]);

  return (
    <div className={modalCart ? "container-cart" : "container-cart-hide"}>
      <h1 className="mycart">Shopping List</h1>
      {cart?.map((item) => {
        return <ProductCart key={item?.id} item={item} />;
      })}

      <div className="flex-box">
        <p className="total-cart">Subtotal: ${total?.toLocaleString()}</p>
        <div
          className="btn-confirmcart"
          onClick={() => {
            setModalAlert(true);
            setModalCart(false);
          }}
        >
          Buy now
        </div>
      </div>
    </div>
  );
};

export { Cart };
