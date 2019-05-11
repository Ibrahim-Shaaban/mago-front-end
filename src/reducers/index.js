import { combineReducers } from "redux";

const categoriesReducer = (categories = [], action) => {
  if (action.type === "FETCH_CATEGORIES") {
    return action.payload;
  } else {
    return categories;
  }
};

const categoryProductsReducer = (products = null, action) => {
  if (action.type === "FETCH_PRODUCTS_BY_CATEGORY") {
    return action.payload;
  } else {
    return products;
  }
};

const changeCategoryReducer = (category = {}, action) => {
  if (action.type === "CHANGE_CATEGORY") {
    return action.payload;
  } else {
    return category;
  }
};

const changePageReducer = (currentPage = "home", action) => {
  if (action.type === "CHANGE_PAGE") {
    return action.payload;
  } else {
    return currentPage;
  }
};

const fetchProductReducer = (product = null, action) => {
  if (action.type === "FETCH_PRODUCT") {
    return action.payload;
  }
  return product;
};

const changeCustomerState = (currentCustomer = null, action) => {
  if (action.type === "CHANGE_CUSTOMER_STATE") {
    return action.payload;
  }
  return currentCustomer;
};
export const reducer = combineReducers({
  categories: categoriesReducer,
  categoryProducts: categoryProductsReducer,
  currentCategory: changeCategoryReducer,
  currentPage: changePageReducer,
  currentProduct: fetchProductReducer,
  currentCustomer: changeCustomerState
});
