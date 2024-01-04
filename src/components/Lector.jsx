import React from "react";
import { QrReader } from "react-qr-reader";
import { UseContext } from "../context/UseContext";
import axios from "axios";
import Escanea from "../assets/escanea.png";
import "../styles/lectorstyle.css";

const Lector = () => {
  const { setProduct, setModal, modalQR, setModalQR } =
    React.useContext(UseContext);

  let data = "";

  const Modal = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3900/api/product/" + data
      );
      setProduct(response.data.getProduct);
      setModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={modalQR ? "lector-qr" : "lector-qr-hide"}>
      <img src={Escanea} alt="main-img" className="img-main" />
      <div className="container-qr">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              data = result?.text;
              Modal();
            }
          }}
          constraints={{
            facingMode: "environment",
          }}
          containerStyle={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            zIndex: 0,
          }}
          videoContainerStyle={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderColor: "#EDB544",
            borderRadius: "10px",
            borderWidth: "5px",
            borderStyle: "solid",
            zIndex: 0,
          }}
          videoStyle={{ zIndex: 0 }}
          className="QR"
        />
      </div>
    </div>
  );
};

export { Lector };
