import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  onToken = async (token, addresses) => {
    console.log(token.id);

    axios
      .post("http://localhost:5555/charge", {
        token: token.id,
        amount: parseInt(this.props.totalPrice)
      })
      .then(res => alert(res.data.outcome.seller_message))
      // .then(res=>console.log(res))
      .catch(err => console.log("err", err));
  };
  // TODO: Send the token information and any other
  // relevant information to your payment process
  // server, wait for the response, and update the UI
  // accordingly. How this is done is up to you. Using
  // XHR, fetch, or a GraphQL mutation is typical.

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_vx1Y5kadMapoS3tki2jSp1Gs00CG3oiFLF"
        amount={this.props.totalPrice}
        billingAddress
        description="Awesome Product"
        locale="auto"
        name="YourDomain.tld"
        token={this.onToken}
        zipCode
        disabled={this.props.totalPrice === 0}
      />
    );
  }
}
