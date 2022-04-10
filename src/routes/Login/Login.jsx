import React from "react";
import NavigationBar from "../../components/NavigationBar";
import { Container, Form, Button } from "react-bootstrap";
import styles from "./Login.module.scss";

function Login() {
  return (
    <div>
      <NavigationBar />
      <Container className={styles.container}>
        <Form className={styles.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className={styles.button} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
