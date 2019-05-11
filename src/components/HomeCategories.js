import React from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchProductsByCategory } from "../actions";
import HomeCategory from "./HomeCategory";
import Loading from "./Loading";

class HomeCategories extends React.Component {
  // componentDidMount() {
  //   this.props.fetchCategories();
  // }

  renderList = () => {
    return this.props.categories.map(category => {
      return <HomeCategory key={category._id} category={category} />;
    });
  };
  render() {
    if (this.props.categories.length === 0) {
      return <Loading />;
    }

    return this.renderList();
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    categoryProducts: state.categoryProducts
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCategories,
    fetchProductsByCategory
  }
)(HomeCategories);
