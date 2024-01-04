import React from "react";
import "../styles/cartstyle.css";
import { UseContext } from "../context/UseContext";
import closeImg from "../assets/close-svgrepo-com.svg";

const ProductCart = ({ item }) => {
  const { cart, setCart } = React.useContext(UseContext);

  const handleDelete = () => {
    const newArray = cart.filter((objeto) => objeto !== item);
    setCart(newArray);
  };

  return (
    <>
      <div className="item-cart">
        <div className="img-cart">
          <img src={item?.image} alt="product-cart" />
        </div>
        <div className="txt-cart">
          <div className="title-cart">{item?.title}</div>
          <div className="price-cart">Quantity: {item?.quantity}</div>
          <div className="price-cart"> Size: {item?.size}</div>
          <div className="price-cart">${item?.price.toLocaleString()}</div>
        </div>
        <div className="delete-cart">
          <img
            src={closeImg}
            alt=""
            className="delete-btn-cart"
            onClick={() => {
              handleDelete();
            }}
          />
        </div>
      </div>
    </>
  );
};

export { ProductCart };
