import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "@/components/Message";
import Loader from "@/components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ProductListPage = () => {
  const {
    data,
    isLoading: loadingproducts,
    error,
    refetch,
  } = useGetProductsQuery();
  const navigate = useNavigate();
  const [
    createProduct,
    { isLoading: loadingCreateProduct, error: errorCreateProduct },
  ] = useCreateProductMutation();

  console.log(data);

  const [deleteProduct, { isLoading: loadingdelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      navigate("/admin/createproduct/");
      refetch();
    } catch (error) {
      toast.error(error.error || error?.data?.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are You Sure?")) {
      try {
        await deleteProduct(id);
        toast.success(" Product Deleted");
        refetch();
      } catch (error) {
        toast.error(error.error || error?.data?.message);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingdelete && <Loader />}
      {loadingCreateProduct && <Loader />}
      {loadingproducts ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {" "}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        Edit <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListPage;
