import React from "react";
import { Button, Modal } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import { Button as BootstrapButton } from "react-bootstrap";
import { connect } from "react-redux";
import { changeCurrentPage, changeCustomerState } from "../actions";
class ModalExampleShorthand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activItem: props.act,
      handleItemClick: props.handleItemClick,
      isLoged: false,
      email: "",
      password: "",
      retypepass: "",
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      validEmail: false,
      showModal: true,
      loginState: true,
      userEmail: "",
      openModal: null
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
    this.switchToRegisterState = this.switchToRegisterState.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onloginPressed = this.onloginPressed.bind(this);
  }

  onloginPressed() {
    this.setState({ isLoged: true, openModal: true });
  }

  onCloseModal() {
    this.setState({ loginState: true });
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  switchToRegisterState() {
    this.setState({ loginState: !this.state.loginState });
  }

  handelOpenModal = openModalState => {
    if (openModalState !== null) {
      return openModalState;
    }
    return false;
  };

  onSubmitClicked() {
    const myemail = this.state.email;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myemail)) {
      this.setState({ validEmail: true });

      if (this.state.loginState) {
        // login
        axios
          .post("https://radiant-inlet-66356.herokuapp.com/api/auth", {
            email: this.state.email,
            password: this.state.password
          })
          .then(res => {
            this.setState({ userEmail: this.state.email, openModal: false });
            // localStorage.setItem("token", res.data);
            const { token, customer } = res.data;
            this.props.changeCustomerState(customer, token);
            localStorage.setItem(
              "currentCustomer",
              JSON.stringify({
                customerData: customer,
                token
              })
            );

            console.log(res);
            this.props.changeCurrentPage("home");
          })
          .catch(err => {
            console.log("Wrong Email or Pass!!!");
          });
      }

      if (!this.state.loginState) {
        const pass = this.state.password;
        const repass = this.state.retypepass;
        if (pass === repass) {
          axios
            .post("https://radiant-inlet-66356.herokuapp.com/api/users", {
              email: this.state.email,
              password: this.state.password,
              firstname: this.state.firstName,
              lastname: this.state.lastName,
              address: {
                street: this.state.street,
                city: this.state.city,
                state: this.state.state
              },
              isAdmin: false,
              phone: this.state.phone
            })
            .then(res => {
              this.setState({ userEmail: this.state.email, openModal: false });

              console.log(res);
              this.props.changeCurrentPage("home");
              const { token, customer } = res.data;
              this.props.changeCustomerState(customer, token);
              localStorage.setItem(
                "currentCustomer",
                JSON.stringify({
                  customerData: customer,
                  token
                })
              );
            })
            .catch(err => {
              console.log("Already Exist!!!");
            });
        } else {
          console.log("pass and retype-pass are not the same!");
        }
      }
    } else {
      // alert("You have entered an invalid email address!")
      this.setState({ validEmail: false });
    }
  }

  render() {
    return (
      <Modal
        trigger={
          <BootstrapButton variant="success" onClick={this.onloginPressed}>
            Login
          </BootstrapButton>
        }
        size={this.state.loginState ? "mini" : "tiny"}
        onClose={this.onCloseModal}
        open={this.handelOpenModal(this.state.openModal)}
      >
        <Modal.Header>
          {this.state.loginState ? "Please login" : "Please register"}
        </Modal.Header>
        <Modal.Content>
          {this.state.loginState ? (
            <Login
              handleFormChange={this.handleFormChange}
              onSubmitClicked={this.onSubmitClicked}
              data={this.state}
            />
          ) : (
            <Register
              handleFormChange={this.handleFormChange}
              onSubmitClicked={this.onSubmitClicked}
              data={this.state}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content={this.state.loginState ? "Register" : "Login"}
            onClick={this.switchToRegisterState}
          />
          <BootstrapButton
            onClick={() => {
              this.setState({ openModal: false });
            }}
            variant="danger"
          >
            cancel
          </BootstrapButton>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    changeCurrentPage,
    changeCustomerState
  }
)(ModalExampleShorthand);
