import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import styles from "./Register.module.scss";

function Register() {
  const [isShownPassword, setIsShownPassword] = useState(false);
  return (
    <div>
      <NavigationBar />
      <Container className={styles.container}>
        <Form className={styles.form}>
          <Form.Group className="mb-3" controlId="firstNameInput">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastNameInput">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter your last name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="usernameInput">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <InputGroup className="mb-3">
            <FormControl
              type={isShownPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <Button
              className={styles["show-password-button"]}
              onClick={() => setIsShownPassword(!isShownPassword)}
              variant="outline-secondary"
              id="button-addon1"
            >
              {isShownPassword ? "Hide" : "Show"}
            </Button>
          </InputGroup>

          <Button className={styles.button} variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
