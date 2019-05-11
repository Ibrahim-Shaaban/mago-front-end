// firstname: Joi.string().required().min(4).max(50) ,
// lastname: Joi.string().required().min(4).max(50) ,
// email: Joi.string().required().min(8).max(100),
// password: Joi.string().required().min(5).max(300),
// address : Joi.object({
//     street: Joi.string().required().min(4).max(50) ,
//     city: Joi.string().required().min(4).max(50) ,
//     state: Joi.string().required().min(4).max(50) ,
// }).required() ,
// isAdmin : Joi.boolean() ,
// phone : Joi.string().required().min(8).max(20)

import React from "react";
import { Form, Message, Button } from "semantic-ui-react";

const FormExampleSubcomponentId = props => (
  <Form success onSubmit={props.onSubmitClicked}>
    <Form.Group widths="equal">
      <Form.Input
        required
        name="firstName"
        value={props.data.firstName}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-first-name"
        label="First name"
        placeholder="First name"
      />
      <Form.Input
        required
        name="lastName"
        value={props.data.lastName}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-last-name"
        label="Last name"
        placeholder="Last name"
      />
    </Form.Group>

    <Form.Input
      required
      name="email"
      value={props.data.email}
      onChange={props.handleFormChange}
      label="Email"
      placeholder="joe@schmoe.com"
    />

    <Form.Group widths="equal">
      <Form.Input
        required
        name="password"
        value={props.data.password}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-password"
        label="Password"
        placeholder="Password"
      />
      <Form.Input
        required
        name="retypepass"
        value={props.data.retypepass}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-retype-password"
        label="Retype Password"
        placeholder="Retype Password"
      />
    </Form.Group>

    <Form.Group widths="equal">
      <Form.Input
        required
        name="street"
        value={props.data.street}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-street"
        placeholder="Street"
      />
      <Form.Input
        required
        name="city"
        value={props.data.city}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-city"
        placeholder="City"
      />
      <Form.Input
        required
        name="state"
        value={props.data.state}
        onChange={props.handleFormChange}
        fluid
        id="form-subcomponent-shorthand-input-state"
        placeholder="State"
      />
    </Form.Group>

    <Form.Input
      required
      name="phone"
      value={props.data.phone}
      onChange={props.handleFormChange}
      label="Phone Number"
      placeholder="Phone"
    />

    <Button type="submit">Submit</Button>
    {/* <p>Your Email: {props.data.email}</p>
    <p>Your Pass: {props.data.password}</p>
    <p>Valid email on submit: {props.data.validEmail ? "yes" : "no"}</p> */}
    <Message
      success
      header="Form Completed"
      content="You're all signed up for our website"
    />
  </Form>
);

export default FormExampleSubcomponentId;
