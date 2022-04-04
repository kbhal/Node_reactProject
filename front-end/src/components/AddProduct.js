import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState("");
  const addProduct = async () => {
    // console.log(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    // console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(userId);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",

        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    // console.log(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="enter product name "
        className="inputbox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        placeholder="enter product price "
        className="inputbox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type="text"
        placeholder="enter product category "
        className="inputbox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        placeholder="enter product company"
        className="inputbox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company name</span>
      )}
      <button onClick={addProduct} className="btn">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
