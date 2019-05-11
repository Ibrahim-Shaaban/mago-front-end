import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Header from "./Header";
import HomePage from "./HomePage";
import { changeCurrentPage } from "../actions";
import CategoryPage from "./CategoryPage";

import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

class App extends React.Component {
  renderPage = () => {
    const { currentPage, categoryProducts } = this.props;
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "category":
        return <CategoryPage products={categoryProducts} />;
      case "product":
        return <ProductPage />;
      case "cart":
        return <CartPage />;
      default:
        console.log("default");
    }
  };
  render() {
    const currentPage = this.renderPage();
    return (
      <div>
        <Header />
        {currentPage}
      </div>
    );
  }
}

library.add(faStroopwafel);

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

export default connect(
  mapStateToProps,
  {
    changeCurrentPage
  }
)(App);
