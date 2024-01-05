import React from "react";
import "../styles/itempurchasestyle.css";
import axios from "axios";
import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale";

function ItemPurchase({ purchase, setLoading }) {
  const [updateLoading, setUpdateLoading] = React.useState(false);

  const fechaConvertida = (date) => {
    return format(
      parse(date.split(",")[0], "dd/MM/yyyy", new Date()),
      "MMMM d', ' yyyy",
      {
        locale: enUS,
      }
    );
  };

  const onPackageReceived = async (id) => {
    try {
      const response = await axios.patch(
        "http://localhost:3900/api/purchase/update",
        { purchase_id: id, delivered: true }
      );

      setTimeout(() => {
        setLoading(true);
        setUpdateLoading(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelShipment = async (id) => {
    try {
      const response = await axios.patch(
        "http://localhost:3900/api/purchase/update",
        { purchase_id: id, isCancel: true }
      );

      setTimeout(() => {
        setLoading(true);
        setUpdateLoading(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="box-purchase">
      <div className="row-information">
        <div className="date-purchase">{fechaConvertida(purchase?.date)}</div>
        {purchase?.isCancel === true && (
          <div className="date-purchase">Canceled</div>
        )}

        {purchase?.delivered === true && (
          <div className="date-purchase">Delivered</div>
        )}

        {!purchase?.delivered && !purchase?.isCancel && (
          <div className="date-purchase">In delivery</div>
        )}
      </div>

      {purchase?.products.map((item) => {
        return (
          <div className="row-purchase" key={item?.id}>
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

      {purchase?.delivered && (
        <div className="detail-purchase">
          Delivery date: {fechaConvertida(purchase.updateDate)}
        </div>
      )}

      {purchase?.isCancel && (
        <div className="detail-purchase">
          Cancellation date: {fechaConvertida(purchase.updateDate)}
        </div>
      )}

      {!purchase?.delivered && !purchase?.isCancel && (
        <div
          className="received-purchase"
          onClick={() => {
            setUpdateLoading(true);
            onPackageReceived(purchase._id);
          }}
        >
          {updateLoading ? <div className="spinner"></div> : "Package received"}
        </div>
      )}

      {!purchase?.delivered && !purchase?.isCancel && (
        <div
          className="cancel-purchase"
          onClick={() => {
            onCancelShipment(purchase._id);
          }}
        >
          Cancel shipment
        </div>
      )}
    </div>
  );
}

export default ItemPurchase;
