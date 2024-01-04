import React from "react";
import { UseContext } from "../context/UseContext";
import "../styles/cartstyle.css";
import { ProductCart } from "./ProductCart";
import axios from "axios";

const Cart = () => {
  const {
    modalCart,
    setModalCart,
    cart,
    setCart,
    cartId,
    userInformation,
    setCartId,
  } = React.useContext(UseContext);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

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

  const handlePurchase = async () => {
    if (cart.length > 0) {
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
            const deleteResponse = await axios.delete(
              "http://localhost:3900/api/cart/delete/" + cartId
            );
            setCart([]);
            setModalCart(false);
            fetchCart(userInformation._id);
          } catch (error) {}
        }
      } catch (error) {}
    } else {
      setModalCart(false);
    }
  };

  const fetchCart = async (id) => {
    try {
      const response = await axios.post("http://localhost:3900/api/cart/save", {
        user_id: id,
        products: [],
      });
      setCart(response.data.getCart.products);
      setCartId(response.data.getCart._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={modalCart ? "container-cart" : "container-cart-hide"}>
      <h1 className="mycart">Shopping List</h1>
      {cart.map((item) => {
        return <ProductCart key={item?._id} item={item} />;
      })}

      <div className="flex-box">
        <p className="total-cart">Subtotal: ${total.toLocaleString()}</p>
        <div className="btn-confirmcart" onClick={() => handlePurchase()}>
          Buy now
        </div>
      </div>
    </div>
  );
};

export { Cart };
