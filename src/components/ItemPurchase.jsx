import React from "react";
import "../styles/itempurchasestyle.css";
import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale";

function ItemPurchase({ purchase }) {
  let fechaConvertida = format(
    parse(purchase?.date.split(",")[0], "dd/MM/yyyy", new Date()),
    "MMMM d', ' yyyy",
    {
      locale: enUS,
    }
  );
  return (
    <div className="box-purchase">
      <div className="row-information">
        <div className="date-purchase">{fechaConvertida}</div>
        {purchase?.isCancel === true && (
          <div className="date-purchase">Canceled</div>
        )}

        {purchase?.delivered === true ? (
          <div className="date-purchase">Delivered</div>
        ) : (
          <div className="date-purchase">In delivery</div>
        )}
      </div>

      {purchase?.products.map((item) => {
        return (
          <div className="row-purchase">
            <div className="product-purchase">
              <div className="img-purchase">
                <img src={item?.image} alt="" />
              </div>
              <div className="info-purchase">
                <div>{item?.title}</div>
                <div className="low-txt">
                  Price: ${item?.price.toLocaleString()}
                </div>
                <div className="low-txt">Quantity: {item?.quantity}</div>
                <div className="low-txt">Size: {item?.size}</div>
              </div>
            </div>
          </div>
        );
      })}

      {!purchase?.delivered && (
        <div className="received-purchase">Package received</div>
      )}

      {!purchase?.delivered && (
        <div className="cancel-purchase">Cancel shipment</div>
      )}
    </div>
  );
}

export default ItemPurchase;
