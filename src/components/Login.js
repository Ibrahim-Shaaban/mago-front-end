import React from "react";
import { Button, Form } from "semantic-ui-react";

function FormExampleForm(props) {
  return (
    <Form onSubmit={props.onSubmitClicked}>
      <Form.Field>
        <label>E-mail</label>
        <input
          name="email"
          required="true"
          value={props.data.email}
          onChange={props.handleFormChange}
          placeholder="Email"
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          name="password"
          type="password"
          required="true"
          value={props.data.password}
          onChange={props.handleFormChange}
          placeholder="Password"
        />
      </Form.Field>

      <Button type="submit">Submit</Button>
      {/* <p>Your Email: {props.data.email}</p>
      <p>Your Pass: {props.data.password}</p>
      <p>Valid email on submit: {props.data.validEmail ? "yes" : "no"}</p> */}
    </Form>
  );
}

export default FormExampleForm;
