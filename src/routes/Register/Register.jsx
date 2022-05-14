import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import usersService from "../../services/users";
import styles from "./Register.module.scss";

function Register() {
  const [isShownPassword, setIsShownPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const [errors, setErrors] = useState([]);
  // const [showErr, setShowErr] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);

    usersService
      .register(formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavigationBar />
      <Container className={styles.container}>
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

          <Button className={styles.button} variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
