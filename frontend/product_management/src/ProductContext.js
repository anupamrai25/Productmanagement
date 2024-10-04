import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    setProducts(response.data);
  };

  const addProduct = async (product) => {
    const response = await axios.post("http://localhost:5000/api/products", product);
    setProducts([...products, response.data]);
  };

  const updateProduct = async (id, updatedProduct) => {
    await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
