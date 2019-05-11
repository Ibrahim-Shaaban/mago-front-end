import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import {
  changeCategory,
  changeCurrentPage,
  fetchProductsByCategory
} from "../actions";
class HomeCategory extends React.Component {
  state = {
    categoryProducts: []
  };

  async componentDidMount() {
    const products = await this.fetchProducts(this.props.category._id);
    this.setState({ categoryProducts: products });
  }

  fetchProducts = async categoryId => {
    const response = await axios.get(
      `https://radiant-inlet-66356.herokuapp.com/api/products/category/${categoryId}`
    );
    return response.data;
  };

  renderList = () => {
    const products = this.state.categoryProducts.slice(0, 3);
    return products.map(product => {
      return (
        <Col md="4" key={product._id}>
          <ProductItem product={product} />
        </Col>
      );
    });
  };
  render() {
    if (this.state.categoryProducts.length === 0)
      return (
        <div>
          <Loading />
        </div>
      );
    const { category } = this.props;
    return (
      <div>
        <Card>
          <Card.Header className="text-center" as="h2">
            {category.name}
          </Card.Header>
          <Card.Body>
            <Row>{this.renderList()}</Row>
            <div
              className="text-center mt-2"
              onClick={() => {
                localStorage.setItem(
                  "currentCategory",
                  JSON.stringify(category)
                );
                this.props.changeCurrentPage("category");
                this.props.changeCategory(category);
                this.props.fetchProductsByCategory(category._id);
              }}
            >
              <div>
                <Button variant="success">
                  Show more {this.props.category.name}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  // console.log(state);
  return state;
};

export default connect(
  mapStatetoProps,
  {
    changeCategory,
    changeCurrentPage,
    fetchProductsByCategory
  }
)(HomeCategory);
