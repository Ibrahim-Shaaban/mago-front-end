import React from "react";

import Cart from "./Cart"; // Cart component
import carts from "./carts"; // cart data from database

import { Item } from "semantic-ui-react";

import Checkout from "./Checkout";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

console.log(carts);
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      productCarts: carts,
      totalPrice: 0,
      toBuyLength: 0,
      quantityInputValue: 1,
      customerData: null,
      token: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    // this.handleQuantDis = this.handleQuantDis.bind(this)
  }

  handleChange = id => {
    const { productCarts } = this.state;
    const filteredProducts = productCarts.filter(item => item._id !== id);
    const sum = filteredProducts.reduce((acc, item) => {
      return acc + item.price * item.quantityDemand;
    }, 0);

    this.setState({ productCarts: filteredProducts });
    this.setState({
      toBuyLength: filteredProducts.filter(item => item.quantityDemand > 0)
        .length
    });
    this.setState({ totalPrice: sum });
  };

  handleQuantityChange(id, op) {
    var prods = this.state.productCarts;
    const prod = this.state.productCarts.filter(item => item._id === id);
    const myprod = prod[0];
    var myQuantityDemand = myprod.quantityDemand;
    // console.log(op)
    if (
      op == "inc" &&
      myQuantityDemand >= 0 &&
      myQuantityDemand < myprod.quantity
    ) {
      myQuantityDemand += 1;
    } else if (
      op == "dec" &&
      myQuantityDemand <= myprod.quantity &&
      myQuantityDemand > 0
    ) {
      myQuantityDemand -= 1;
    }
    myprod.quantityDemand = myQuantityDemand;
    // this.setState({productCarts[id-1]: })
    var i;
    for (i = 0; i < prods.length; i++) {
      if (prods[i].id == id) {
        prods[i] = myprod;
      }
    }
    this.setState({ productCarts: prods });

    var sum = 0;
    this.state.productCarts.forEach(element => {
      sum = sum + element.price * element.quantityDemand;
    });
    this.setState({ totalPrice: sum });
    // this.setState({productCarts: })
    this.setState({
      toBuyLength: this.state.productCarts.filter(
        item => item.quantityDemand > 0
      ).length
    });

    console.log(myprod);
  }

  componentDidMount() {
    const customer = JSON.parse(localStorage.getItem("currentCustomer"));
    if (customer) {
      this.setState({
        customerData: customer.customerData,
        customerToken: customer.token
      });
    }
    var sum = 0;
    this.state.productCarts.forEach(element => {
      sum = sum + element.price * element.quantityDemand;
    });
    this.setState({ totalPrice: sum });
  }

  checkLogin = customerData => {
    if (customerData) {
      return true;
    }
    return false;
  };

  render() {
    // const productCarts = carts.map(item => <Cart key={item.id} cart={item}/>)
    const cartProds = this.state.productCarts.map(item => {
      console.log(item);

      return (
        <Cart
          onChange={this.handleQuantityChange}
          quantityDemand={item.quantityDemand}
          key={item._id}
          cart={item}
          method={this.handleChange}
        />
      );
    });

    const isLogedIn = this.checkLogin(this.state.customerData);

    // if (!isLogedIn)
    //   return (
    //     <Container>
    //       <h2>sorry , please login ya beeh</h2>
    //     </Container>
    //   );
    return (
      <Container>
        <Row className="mt-2">
          <Col md="9">
            <div>
              {/* <NavBar /> */}
              <div>
                <div>
                  <div>
                    <Item.Group divided>
                      {cartProds.length > 0 ? (
                        cartProds
                      ) : (
                        <div>
                          <h1 align="center">No Items in Your Cart!</h1>
                        </div>
                      )}
                    </Item.Group>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="3">
            <div style={{ border: "1px solid #fafafa", padding: 5 }}>
              <h3>
                Subtotal ({this.state.toBuyLength} item/s):{" "}
                {this.state.totalPrice} L.E
              </h3>
              <hr />
              <h4 align="center" style={{ color: "brown" }}>
                You will pay in Dollar:{" "}
                {Math.floor((this.state.totalPrice / 17.4) * 100) / 100} $
              </h4>
              <Checkout totalPrice={(this.state.totalPrice / 17.4) * 100} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("from cart page", state);
  return state;
};

export default connect(mapStateToProps)(App);
