import { Row, Col } from "react-bootstrap";
import Product from "@/components/Product";
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
              <Col key={product._id} xs={12} sm={6} lg={4}>
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
