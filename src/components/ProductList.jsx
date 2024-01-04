import React from "react";
import axios from "axios";
import { UseContext } from "../context/UseContext";
import Pagination from "../components/Pagination";
import "../styles/productlist.css";

const ProductList = () => {
  const [productsData, setProductsData] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const { setProduct, setModal } = React.useContext(UseContext);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3900/api/products?page=" + page
        );
        setProductsData(response?.data.products);
        setCount(response?.data.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [page]);

  return (
    <>
      <div className="product-list">
        {productsData.map((item) => {
          return (
            <div
              className="productBox"
              key={item?._id}
              item={item}
              onClick={() => {
                setProduct(item);
                window.scrollTo(0, 0);
                setModal(true);
              }}
            >
              <img src={item?.image} />
              <div>{item?.title}</div>
              <div className="price">${item?.price.toLocaleString()}</div>
            </div>
          );
        })}
        {productsData.length % 2 != 0 && (
          <div className="productBox">
            <img src="" />
            <div></div>
            <div className="price"></div>
          </div>
        )}
      </div>

      <Pagination
        setPage={setPage}
        page={page}
        productsData={productsData}
        count={count}
      />
    </>
  );
};

export default ProductList;
