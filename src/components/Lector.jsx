import React from "react";
import { QrReader } from "react-qr-reader";

const Lector = () => {
  const [data, setData] = React.useState("No hay nada");

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: "100%" }}
        videoStyle={{ backgroundColor: "#000" }}
      />
      <p>{data}</p>
    </div>
  );
};

export { Lector };
