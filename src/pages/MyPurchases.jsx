import React from "react";
import { Cart } from "../components/Cart";
import UserInfo from "../components/UserInfo";
import { Product } from "../components/Product";
import PageBanner from "../components/PageBanner";
import Purchases from "../components/Purchases";
import Footer from "../components/Footer";

function MyPurchases() {
  return (
    <>
      <PageBanner title={"Mis compras"} />
      <Purchases />
      <Footer />
    </>
  );
}

export default MyPurchases;
