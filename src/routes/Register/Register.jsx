import React, { useState } from "react";
import Button from "../../components/Button";
import {
  Container,
  Form,
  InputGroup,
  FormControl,
  Toast,
  Button as BootstrapButton,
} from "react-bootstrap";
import usersService from "../../services/users";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import useLocalStorage from "../../hooks/useLocalStorage";

function Register() {
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showErr, setShowErr] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  useLocalStorage();

  const handleClose = () => {
    setShowErr(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    usersService
      .register(formData)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
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
          <Form.Group className="mb-3" controlId="firstNameInput">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="first_name"
              onChange={onChange}
              value={formData.first_name}
              type="text"
              placeholder="Enter your first name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastNameInput">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              onChange={onChange}
              name="last_name"
              value={formData.last_name}
              type="text"
              placeholder="Enter your last name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="usernameInput">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={onChange}
              name="username"
              value={formData.username}
              type="text"
              placeholder="Enter your username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={onChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <InputGroup className="mb-3">
            <FormControl
              onChange={onChange}
              name="password"
              value={formData.password}
              type={isShownPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <BootstrapButton
              className={styles["show-password-button"]}
              onClick={() => setIsShownPassword(!isShownPassword)}
              variant="outline-secondary"
              id="button-addon1"
            >
              {isShownPassword ? "Hide" : "Show"}
            </BootstrapButton>
          </InputGroup>

          <div className={styles["button-container"]}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              value="Sign up"
              type="submit"
              onClick={onSubmit}
            />
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
