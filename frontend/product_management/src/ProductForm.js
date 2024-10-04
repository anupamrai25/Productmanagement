import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "./ProductContext";
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import "./ProductForm.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Name is too short').required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().positive('Price must be a positive number').required('Required'),
  isRecommended: Yup.boolean(),
  isBestseller: Yup.boolean(),
  status: Yup.string().required('Required'),
});

const ProductForm = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      isRecommended: false,
      isBestseller: false,
      status: "Available", 
    },
    validationSchema,
    onSubmit: (values) => {
      addProduct(values);
      navigate('/'); 
    },
  });

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Add New Product</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input
                type="text"
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                placeholder="Enter product name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="invalid-feedback">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`}
                id="price"
                name="price"
                placeholder="Enter price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="invalid-feedback">{formik.errors.price}</div>
              ) : null}
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isRecommended"
                name="isRecommended"
                checked={formik.values.isRecommended}
                onChange={formik.handleChange}
              />
              <label htmlFor="isRecommended" className="form-check-label">Is Recommended</label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isBestseller"
                name="isBestseller"
                checked={formik.values.isBestseller}
                onChange={formik.handleChange}
              />
              <label htmlFor="isBestseller" className="form-check-label">Is Bestseller</label>
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className={`form-select ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div className="invalid-feedback">{formik.errors.status}</div>
              ) : null}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductForm;
