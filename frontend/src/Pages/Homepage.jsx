import { Row, Col } from "react-bootstrap";
import Product from "@/components/Product";
// import products from "../products";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";

const Homepage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Homepage;
