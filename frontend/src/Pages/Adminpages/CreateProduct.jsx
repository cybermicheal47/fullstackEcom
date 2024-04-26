import { useCreateProductMutation } from "@/slices/productsApiSlice";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const [
    createProduct,
    { isLoading: loadingCreateProduct, error: errorCreateProduct },
  ] = useCreateProductMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name: formData.name,
        price: formData.price,
        image: formData.image,
        brand: formData.brand,
        category: formData.category,
        countInStock: formData.countInStock,
        description: formData.description,
      }).unwrap();

      setFormData({
        name: "",
        price: "",
        image: "",
        brand: "",
        category: "",
        countInStock: "",
        description: "",
      });

      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error);

      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Count in Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count in stock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default CreateProduct;
