import React from "react";
import { Button, Icon, Item, Label } from "semantic-ui-react";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: props.cart.name,
      quantityDemand: props.quantityDemand, // we must add it to ptoduct
      img: props.cart.cover,
      price: props.cart.price,
      description: props.cart.description,
      quantity: props.cart.quantity,
      prodId: props.cart._id,
      method: props.method,
      key: props.key,
      onChange: props.onChange
    };
  }

  componentWillReceiveProps(newProps) {
    // console.log("from cart new props :",newProps)
    this.setState({ quantityDemand: newProps.quantityDemand });
  }

  render() {
    return (
      // <div className='row'>
      //     <img src={props.cart.img} style={{width: 100, height: 200}}/>
      //     <h2>{props.cart.productName}</h2>
      //     <h4>{props.cart.price}</h4>
      //     <p>{props.cart.description}</p>
      //     <button>Delete</button>
      // </div>
      <Item>
        <Item.Image size="small" src={this.state.img} />
        <Item.Content>
          <Item.Header as="a">{this.state.productName}</Item.Header>
          <Item.Meta>
            <span className="cinema">{this.state.price} L.E</span>
          </Item.Meta>
          <Item.Description>{this.state.description}</Item.Description>
          <Item.Extra>
            {/* <input 
                            id={this.state.key} 
                            value={this.state.quantInpTxt} 
                            type="number" 
                            floated='right' 
                            min={1} max={this.state.quantity} 
                            onChange={(event) => {
                            this.state.onChange(event , this.state.key )
                        }}/> */}
            <Button.Group>
              <Button
                onClick={() => this.state.onChange(this.state.prodId, "dec")}
              >
                -
              </Button>
              <Button.Or text={this.state.quantityDemand} />
              <Button
                color="green"
                onClick={() => this.state.onChange(this.state.prodId, "inc")}
              >
                +
              </Button>
            </Button.Group>
            <Button
              primary
              floated="right"
              onClick={() => this.state.method(this.state.prodId)}
            >
              Delete from cart
              <Icon name="trash alternate" />
            </Button>
            <Label>/{this.state.quantity}</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}
export default Cart;
