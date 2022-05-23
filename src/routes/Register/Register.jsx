import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
  Toast,
  Spinner,
} from "react-bootstrap";
import usersService from "../../services/users";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";

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
        setErrors([...errors, err.response.data.error]);
        setIsLoading(false);
        setShowErr(true);
      });
  };

  return (
    <div>
      <NavigationBar />
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
            <Button
              className={styles["show-password-button"]}
              onClick={() => setIsShownPassword(!isShownPassword)}
              variant="outline-secondary"
              id="button-addon1"
            >
              {isShownPassword ? "Hide" : "Show"}
            </Button>
          </InputGroup>

          <Button
            className={styles.button}
            disabled={isLoading}
            variant="primary"
            type="submit"
          >
            Sign up {isLoading && <Spinner animation="border" size="sm" />}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
