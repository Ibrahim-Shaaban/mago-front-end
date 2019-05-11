let carts = JSON.parse(localStorage.getItem("shoppingCart"));

if (carts) {
  carts.forEach(product => {
    if (!product.quantityDemand) product.quantityDemand = 0;
  });
}

// console.log(carts);

export default carts;
