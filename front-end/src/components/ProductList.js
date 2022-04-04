import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    // console.log(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "Delete",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    // console.log(result);
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    // console.log(event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="search-product-box"
        type="text"
        placeholder="search product"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul>
            <li key="{'index'}">{index + 1}</li>
            <li key="{'name'}">{item.name}</li>
            <li key="{'price'}">$ {item.price}</li>
            <li key="{'category'}">{item.category}</li>
            <li key="{'delete'}">
              <button onClick={() => deleteProduct(item._id)}>Delete </button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No record found</h1>
      )}
    </div>
  );
};

export default ProductList;
