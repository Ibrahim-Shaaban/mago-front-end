import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ProductPageImages from "./ProductPageImages";
import ProductItem from "./ProductItem";
import axios from "axios";

class ProductPage extends React.Component {
  state = {
    currentProduct: null,
    similarProducts: null
  };
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      currentProduct: nextProps.currentProduct,
      similarProducts: nextProps.categoryProducts
    });
  }

  checkLogin = customerData => {
    if (customerData) {
      return true;
    }
    return false;
  };

  renderSimilarProducts = products => {
    if (!products) {
      return <Loading />;
    }
    const similarProducts = products.slice(0, 3).map(product => {
      return (
        <Col md="4" className="mb-3" key={product._id}>
          <ProductItem product={product} />
        </Col>
      );
    });

    return (
      <Card>
        <Card.Header className="text-center" as="h2">
          similar Products
        </Card.Header>
        <Card.Body>
          <Row>{similarProducts}</Row>
        </Card.Body>
      </Card>
    );
  };

  checkStock = quantity => {
    if (quantity <= 15) {
      return <h3 style={{ color: "red" }}> only {quantity} in stock</h3>;
    }
    return <h3 style={{ color: "green" }}>In Stock</h3>;
  };

  addToCart = currentProduct => {
    // console.log(currentProduct);
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

    if (!shoppingCart) {
      let cart = [];
      cart.push(currentProduct);
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      // console.log(JSON.parse(localStorage.getItem("shoppingCart")));

      const customer = JSON.parse(localStorage.getItem("currentCustomer"));
      // var headers = {
      //   "Content-Type": "application/json",
      //   "x-authToken": customer.token
      // };
      // post request

      axios
        .post(
          "https://radiant-inlet-66356.herokuapp.com/api/carts",
          {
            customerId: customer.customerData._id,
            products: [
              {
                productId: currentProduct._id,
                quantityDemand: 1
              }
            ]
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-authToken": customer.token
            }
          }
        )
        .then(res => console.log(res))
        .catch(console.log);
    } else {
      // edit request
      shoppingCart.push(currentProduct);
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  };
  renderPage = product => {
    if (!product) {
      return <Loading />;
    }
    return (
      <Row>
        <Col md="6">
          <h3 style={{ fontWeight: "bold" }}>{product.name}</h3>
          <h3>
            By : <span style={{ color: "#006fcc" }}>{product.brand.name}</span>
          </h3>
          <ProductPageImages cover={product.cover} images={product.photos} />
        </Col>
        <Col md="3">
          <div
            style={{
              border: "1px solid #dee2e6",
              padding: 5,
              backgroundColor: "#fafafa"
            }}
          >
            <h2 style={{ color: "#006fcc" }}>{product.price} L.E</h2>
            <div style={{ fontSize: 16 }}>
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                Description
              </span>{" "}
              :{`${product.description.substring(0, 400)} ......`}
            </div>
          </div>
        </Col>

        <Col md="3">
          <div
            style={{
              border: "1px solid #dee2e6",
              padding: 5
            }}
          >
            <Button
              variant="success"
              size="lg"
              className="mb-2"
              onClick={() => this.addToCart(product)}
            >
              Add to cart
            </Button>
            {this.checkStock(product.quantity)}
          </div>
        </Col>
        <Col
          md="12"
          className="mt-3 mb-3"
          style={{
            border: "1px solid #dee2e6",
            padding: 5,
            backgroundColor: "#fafafa",
            fontSize: 16
          }}
        >
          <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
            full description :
          </span>
          {product.description}
        </Col>

        <Col md="12">
          <Row className="justify-content-md-center">
            {this.renderSimilarProducts(this.state.similarProducts)}
          </Row>
        </Col>
      </Row>
    );
  };
  render() {
    const { currentProduct } = this.state;
    // const customer = JSON.parse(localStorage.getItem("currentCustomer"));
    // if (!customer) {
    //   return (
    //     <Container>
    //       <h3>please login </h3>
    //     </Container>
    //   );
    // }
    return (
      <Container className="mt-2">{this.renderPage(currentProduct)}</Container>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ProductPage);
