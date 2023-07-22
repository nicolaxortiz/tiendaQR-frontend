import React from "react";
import { UseContext } from "../context/UseContext";
import logo from "../assets/logo-android-google-2-svgrepo-com.svg";
import "../styles/registerinfostyles.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function RegisterInfo() {
  const { modalUserInfo, setModalUserInfo } = React.useContext(UseContext);
  const { user } = useAuth0();

  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    document: "",
    name: "",
    lastName: "",
    cellphone: "",
    country: "",
    region: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3900/api/user/save", {
        document: userData.document,
        name: userData.name,
        lastName: userData.lastName,
        cellphone: userData.cellphone,
        country: userData.country,
        region: userData.region,
        city: userData.city,
        address: userData.address,
        email: user?.email,
      });
      if (response.status === 200) {
        setModalUserInfo(false);
        setLoading(false);
        setUserData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={modalUserInfo ? "box-container" : "box-container-hide"}>
        <div className="title-registerinfo">Bienvenido a la tienda QR</div>
        <div className="subtitle-registerinfo">
          Por favor, cuentanos mas de ti
        </div>
        <img src={logo} alt="logo" className="logo-register" />

        <form onSubmit={handleSubmit}>
          <input
            className="inp-register"
            type="number"
            name="document"
            placeholder="Documento de identidad"
            value={userData.document}
            onChange={handleChange}
            required
          />
          <br />
          <input
            className="inp-register"
            type="text"
            name="name"
            placeholder="Nombres"
            value={userData.name}
            onChange={handleChange}
          />
          <br />
          <input
            className="inp-register"
            type="text"
            name="lastName"
            placeholder="Apellidos"
            value={userData.lastName}
            onChange={handleChange}
          />
          <br />
          <input
            className="inp-register"
            type="number"
            name="cellphone"
            placeholder="Celular"
            value={userData.cellphone}
            onChange={handleChange}
          />
          <br />
          <input
            className="inp-register"
            type="text"
            name="country"
            placeholder="Pais"
            value={userData.country}
            onChange={handleChange}
          />
          <br />
          <input
            className="inp-register"
            type="text"
            name="region"
            placeholder="Departamento"
            value={userData.region}
            onChange={handleChange}
          />
          <br />
          <input
            className="inp-register"
            type="text"
            name="city"
            placeholder="Ciudad"
            value={userData.city}
            onChange={handleChange}
          />
          <br />
          <input
            className="inp-register"
            type="text"
            name="address"
            placeholder="Direccion"
            value={userData.address}
            onChange={handleChange}
          />
          <br />
          <div className="accept-terms">
            <input
              type="checkbox"
              name="accept-terms"
              id=""
              className="checkbox-register"
              required
            />
            Acepto el tratamiento y almacenamiento de mi información
          </div>
          <button type="submit" className="btn-register">
            {loading ? <div className="spinner"></div> : "Registrar datos"}
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterInfo;
