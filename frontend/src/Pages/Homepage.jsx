import { Row, Col } from "react-bootstrap";
import Product from "@/components/Product";
// import products from "../products";
import { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const Fetchproducts = async () => {
      try {
        const url = "/api/products";

        const { data } = await axios.get(url);
        console.log(url);
        console.log(data);
        setproducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    Fetchproducts();
  }, []);
  return (
    <>
      <h1></h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homepage;
