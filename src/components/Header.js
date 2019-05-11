import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import Loading from "./Loading";
import {
  changeCategory,
  fetchProductsByCategory,
  fetchCategories,
  changeCurrentPage,
  changeCustomerState
} from "../actions";
import MyModal from "./MyModal";

class Header extends React.Component {
  state = {
    customerData: null,
    customerToken: null
  };
  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.currentCustomer);
    if (nextProps.currentCustomer) {
      this.setState({
        isLoged: nextProps.isLoged,
        customerData: nextProps.currentCustomer.customerData,
        customerToken: nextProps.currentCustomer.token
      });
      // this.props.changeCustomerState();
    } else {
      const customer = JSON.parse(localStorage.getItem("currentCustomer"));
      if (customer) {
        this.setState({
          isLoged: nextProps.isLoged,
          customerData: customer.customerData,
          customerToken: customer.token
        });
      }
    }
  }

  handleLogOut = () => {
    localStorage.setItem("currentCustomer", JSON.stringify({}));
    this.setState({
      isLoged: false,
      customerData: null,
      customerToken: null
    });
  };

  checkLoginSate = () => {
    const customerData = this.state.customerData;

    if (customerData) {
      return (
        <div>
          <span style={{ color: "white", fontSize: 18, marginRight: 5 }}>
            {" "}
            hi {customerData.firstname}
          </span>
          <Button onClick={() => this.handleLogOut()}>logout</Button>
        </div>
      );
    }
    return <MyModal />;
  };

  renderCategories = () => {
    if (this.props.categories.length === 0) {
      return (
        <div>
          <NavDropdown.Item>
            <Loading />
          </NavDropdown.Item>
        </div>
      );
    }
    return this.props.categories.map(category => {
      return (
        <div
          onClick={() => {
            // localStorage.setItem("currentCategory", JSON.stringify(category));
            this.props.changeCurrentPage("category");
            this.props.changeCategory(category);
            this.props.fetchProductsByCategory(category._id);
          }}
          key={category._id}
        >
          <NavDropdown.Item>{category.name}</NavDropdown.Item>
        </div>
      );
    });
  };

  render() {
    // console.log(this.props);
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <div onClick={() => this.props.changeCurrentPage("home")}>
          <a href="#">
            <Navbar.Brand>Mago</Navbar.Brand>
          </a>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {this.renderCategories()}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        <div className="mr-2">{this.checkLoginSate()}</div>
        <div onClick={() => this.props.changeCurrentPage("cart")}>
          <Button variant="primary" size="lg">
            Cart
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    categories: state.categories,
    currentCategory: state.currentCategory,
    currentCustomer: state.currentCustomer
  };
};

export default connect(
  mapStateToProps,
  {
    changeCategory,
    fetchProductsByCategory,
    fetchCategories,
    changeCurrentPage,
    changeCustomerState
  }
)(Header);
