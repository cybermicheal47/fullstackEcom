import { Row, Col } from "react-bootstrap";
import Product from "@/components/Product";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";
import { useParams } from "react-router-dom";
import Paginate from "@/components/Paginate";
import Meta from "@/components/Meta";

const Homepage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <Meta />
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Homepage;
