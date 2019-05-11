import axios from "axios";

const fetchCategories = () => {
  return async dispatch => {
    const response = await axios.get(
      "https://radiant-inlet-66356.herokuapp.com/api/categories"
    );

    dispatch({ type: "FETCH_CATEGORIES", payload: response.data });
  };
};

const fetchProductsByCategory = categoryId => {
  return async dispatch => {
    // console.log(categoryId);
    const response = await axios.get(
      `https://radiant-inlet-66356.herokuapp.com/api/products/category/${categoryId}`
    );
    // console.log(response);

    dispatch({ type: "FETCH_PRODUCTS_BY_CATEGORY", payload: response.data });
  };
};

const fetchProduct = productId => {
  return async dispatch => {
    // console.log(categoryId);
    const response = await axios.get(
      `https://radiant-inlet-66356.herokuapp.com/api/products/${productId}`
    );
    // console.log(response);

    dispatch({ type: "FETCH_PRODUCT", payload: response.data });
  };
};

const changeCategory = category => {
  return {
    type: "CHANGE_CATEGORY",
    payload: category
  };
};

const changeCurrentPage = pageName => {
  return {
    type: "CHANGE_PAGE",
    payload: pageName
  };
};

const changeCustomerState = (customer, token) => {
  return {
    type: "CHANGE_CUSTOMER_STATE",
    payload: {
      customerData: customer,
      token
    }
  };
};

export {
  fetchCategories,
  fetchProductsByCategory,
  fetchProduct,
  changeCategory,
  changeCurrentPage,
  changeCustomerState
};
