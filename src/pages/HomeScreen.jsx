import React from "react";
import { Cart } from "../components/Cart";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import RegisterInfo from "../components/RegisterInfo";
import { Banner } from "../components/Banner";
import { Lector } from "../components/Lector";
import { Product } from "../components/Product";
import ProductList from "../components/ProductList";

function HomeScreen() {
  return (
    <>
      <Banner />
      <div className="main" style={{ position: "relative" }}>
        <Cart />
        <UserInfo />
        <Lector />
      </div>
      <Product />

      <RegisterInfo />
      <ProductList />
      <Footer />
    </>
  );
}

export default HomeScreen;
