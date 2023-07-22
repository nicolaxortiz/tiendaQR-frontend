import "./App.css";
import React from "react";
import { Banner } from "./components/Banner";
import { Lector } from "./components/Lector";
import { Product } from "./components/Product";
import States from "./hooks/States";
import { UseContext } from "./context/UseContext";
import { Cart } from "./components/Cart";
import Footer from "./components/Footer";
import UserInfo from "./components/UserInfo";
import RegisterInfo from "./components/RegisterInfo";

function App() {
  const initial = States();

  return (
    <UseContext.Provider value={initial}>
      <div className="App">
        <Banner />
        <div className="main" style={{ position: "relative" }}>
          <Cart />
          <UserInfo />
        </div>
        <Product />
        <RegisterInfo />
        <Lector />
        <Footer />
      </div>
    </UseContext.Provider>
  );
}

export default App;
