import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/addproduct" element={<ProductForm />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
