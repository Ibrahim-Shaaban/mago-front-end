import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  changeCurrentPage,
  fetchProduct,
  fetchProductsByCategory
} from "../actions";

class ProductItem extends React.Component {
  render() {
    const {
      product,
      changeCurrentPage,
      fetchProduct,
      fetchProductsByCategory
    } = this.props;
    return (
      <div>
        <Card>
          <div align="center">
            <Card.Img
              variant="center"
              src={product.cover}
              style={{ width: 200, height: 200 }}
            />
          </div>
          <Card.Body>
            <Card.Title as="h3">{product.name.substring(0, 57)}</Card.Title>
            {/* <Card.Text>{product.description}</Card.Text> */}

            <div
              onClick={() => {
                changeCurrentPage("product");
                fetchProduct(product._id);
                fetchProductsByCategory(product.category._id); // similar products
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }}
            >
              <Button variant="primary">Show More</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

export default connect(
  mapStateToProps,
  { changeCurrentPage, fetchProduct, fetchProductsByCategory }
)(ProductItem);
