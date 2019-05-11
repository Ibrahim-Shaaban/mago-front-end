import React from "react";
import { connect } from "react-redux";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  fetchProductsByCategory,
  changeCategory,
  changeCurrentPage
} from "../actions";
import ProductItem from "./ProductItem";
import Loading from "./Loading";

class CategoryPage extends React.Component {
  renderList = products => {
    return products.map(product => {
      return (
        <Col md="4" className="mb-3" key={product._id}>
          <ProductItem product={product} />
        </Col>
      );
    });
  };
  render() {
    const { products, currentCategory } = this.props;
    if (!products)
      return (
        <Container className="mt-2">
          <Row className="mt-2 justify-content-md-center">
            <div>
              <Loading />
            </div>
          </Row>
        </Container>
      );

    return (
      <Container className="mt-2">
        <Row className="mt-2 justify-content-md-center">
          <div className="">
            <Card>
              <Card.Header className="text-center" as="h2">
                {currentCategory.name}
              </Card.Header>
              <Card.Body>
                <Row>{this.renderList(products)}</Row>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}
// {categoryProducts , currentCategory}
const mapStatetoProps = state => {
  // console.log(state);
  return state;
};

export default connect(
  mapStatetoProps,
  {
    fetchProductsByCategory,
    changeCategory,
    changeCurrentPage
  }
)(CategoryPage);
