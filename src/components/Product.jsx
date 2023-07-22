import React from "react";
import { UseContext } from "../context/UseContext";
import ArrowPrev from "../assets/arrow-prev-svgrepo-com.svg";
import ArrowNext from "../assets/arrow-next-svgrepo-com.svg";
import closeBtn from "../assets/close-svgrepo-com-2.svg";
import axios from "axios";
import "../styles/product.css";

const Product = () => {
  const {
    product,
    modal,
    setModal,
    cart,
    setCart,
    modalCart,
    setModalCart,
    modalUser,
    setModalUser,
    modalUserInfo,
    userInformation,
  } = React.useContext(UseContext);

  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState("");
  const [img, setImg] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setSize(product?.size[0]);
  }, [product]);

  const handleQuantity = (operator) => {
    if (operator === "+" && quantity < product?.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (operator === "-" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSize = (element) => {
    setSize(element);
  };

  const handleImage = (option) => {
    if (option === "prev") {
      if (img > 0) {
        setImg((previousImg) => previousImg - 1);
      }
    } else if (option === "next") {
      if (img < product?.image.length - 1) {
        setImg((previousImg) => previousImg + 1);
      }
    }
  };

  const cerrarModal = () => {
    setQuantity(1);
    setSize("");
    setModal(false);
  };

  const agregarCarrito = () => {
    const newCart = [...cart];

    newCart.push({
      id: product?._id,
      title: product?.title,
      price: product?.price * quantity,
      image: product?.image[0],
      quantity: quantity,
      size: size,
    });

    setTimeout(() => {
      setCart(newCart);

      setQuantity(1);
      setSize("");
      setModal(false);
      setLoading(false);
    }, 4000);
  };

  return (
    <>
      <div
        className={
          modal || modalCart || modalUser || modalUserInfo
            ? "background-black"
            : "background-black-hide"
        }
        onClick={() => {
          setModalCart(false);
          setModalUser(false);
        }}
      ></div>
      <div className={modal ? "box-container" : "box-container-hide"}>
        <div
          className="btn-close"
          onClick={() => {
            cerrarModal();
          }}
        >
          <img src={closeBtn} alt="" />
        </div>
        <div className="img-product">
          <div className="left-arrow">
            <img src={ArrowPrev} alt="" onClick={() => handleImage("prev")} />
          </div>
          <div className="right-arrow">
            <img src={ArrowNext} alt="" onClick={() => handleImage("next")} />
          </div>
          <img src={product?.image[img]} className="img-box" alt="Imagen" />
        </div>
        <div className="title-pro">{product?.title}</div>
        <div className="price-pro">
          ${(product?.price * quantity).toLocaleString()}
        </div>

        <div className="quantity-pro">Descripción:</div>
        <div className="desc-pro">{product?.detail}</div>
        <div className="quantity-pro">Cantidad:</div>
        <div className="quantity-box">
          <div
            className="quantity-controler"
            onClick={() => handleQuantity("-")}
          >
            -
          </div>
          <input
            type="number"
            min={1}
            max={2}
            value={quantity}
            readOnly
            className="quantity-input"
          />
          <div
            className="quantity-controler"
            onClick={() => handleQuantity("+")}
          >
            +
          </div>
        </div>

        <div className="quantity-pro">Tallas:</div>
        <div className="size-box">
          {product?.size.map((element) => {
            return (
              <div
                className={size === element ? "selected-size" : "each-size"}
                onClick={() => handleSize(element)}
              >
                {element}
              </div>
            );
          })}
        </div>

        <button
          className="btn-product"
          onClick={() => {
            setLoading(true);
            agregarCarrito();
          }}
        >
          {loading ? <div className="spinner"></div> : "Comprar"}
        </button>
      </div>
    </>
  );
};

export { Product };
