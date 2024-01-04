import "./App.css";
import React from "react";
import States from "./hooks/States";
import { UseContext } from "./context/UseContext";
import HomeScreen from "./pages/HomeScreen";
import MyPurchases from "./pages/MyPurchases.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const initial = States();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/my-purchases",
      element: <MyPurchases />,
    },
  ]);

  return (
    <UseContext.Provider value={initial}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UseContext.Provider>
  );
}

export default App;
