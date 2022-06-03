import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Container, Form, Toast } from "react-bootstrap";
import useLocalStorage from "../../hooks/useLocalStorage";
import usersService from "../../services/users";
import styles from "./Login.module.scss";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showErr, setShowErr] = useState(false);

  useLocalStorage();

  const handleClose = () => {
    setShowErr(false);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    usersService
      .login(formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIsLoading(false);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors([err.response.data.error]);
        setIsLoading(false);
        setShowErr(true);
      });
  };

  return (
    <div>
      <Container className={styles.container}>
        {errors.length > 0 && (
          <div className={styles["error-container"]}>
            <div className={styles.errors}>
              <Toast show={showErr} onClose={handleClose} bg="danger">
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{errors[0]}</Toast.Body>
              </Toast>
            </div>
          </div>
        )}
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
              placeholder="Enter password"
            />
          </Form.Group>

          <div className={styles["button-container"]}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              onClick={onSubmit}
              variant="primary"
              type="submit"
              value="Login"
            />
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
