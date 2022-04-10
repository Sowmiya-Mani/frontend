import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import { Container, Form, Button } from "react-bootstrap";
import usersService from "../../services/users";
import styles from "./Login.module.scss";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    console.log(e.target.name + " :" + e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Pressed submit");

    usersService.login(formData).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <NavigationBar />
      <Container className={styles.container}>
        <Form onSubmit={onSubmit} className={styles.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={formData.email}
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={formData.password}
              onChange={onChange}
              name="password"
              type="password"
              placeholder="Password"
            />
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
