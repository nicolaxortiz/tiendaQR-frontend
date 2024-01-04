import React from "react";
import axios from "axios";
import { UseContext } from "../context/UseContext";
import { useAuth0 } from "@auth0/auth0-react";
import ItemPurchase from "./ItemPurchase";

function Purchases() {
  const { setUserInformation, setPurchases, purchases } =
    React.useContext(UseContext);
  const { user, isAuthenticated } = useAuth0();
  let purchasesArray = [];

  React.useEffect(() => {
    async function fetchUser() {
      if (isAuthenticated) {
        try {
          const response = await axios.post(
            "http://localhost:3900/api/user/getbyEmail",
            { email: user?.email }
          );
          if (response.status === 200) {
            setUserInformation(response.data.user);
            fetchPurchases(response.data.user._id);
          }
        } catch (error) {}
      }
    }

    async function fetchPurchases(id) {
      try {
        const response = await axios.post(
          "http://localhost:3900/api/purchase/get",
          {
            user_id: id,
          }
        );
        console.log(response.data.purchase);
        setPurchases(response.data.purchase);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [user]);

  return (
    <>
      {purchases?.map((item) => {
        return <ItemPurchase key={item._id} purchase={item} />;
      })}
    </>
  );
}

export default Purchases;
