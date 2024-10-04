import React, { useContext, useState } from "react";
import ProductContext from "./ProductContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';

const ProductList = () => {
  const { products, deleteProduct, updateProduct } = useContext(ProductContext); 
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });
  const itemsPerPage = 3;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product }); 
    setShowModal(true); 
  };

  const handleFormSubmit = async () => {
    try {
      await updateProduct(selectedProduct.id, {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
      });
      setShowModal(false); 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value, 
    });
  };

  return (
    <div className="container mt-4">
      <h1>Product List</h1>
      <table className="table custom-table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Recommended</th>
            <th>Bestseller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={product.isRecommended}
            readOnly
          />
        </div>
      </td>
      <td>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={product.isBestseller}
            readOnly
          />
        </div>
      </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                  <FaTrash />
                </button>
                <button className="btn btn-primary ms-2" onClick={() => handleEditClick(product)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
