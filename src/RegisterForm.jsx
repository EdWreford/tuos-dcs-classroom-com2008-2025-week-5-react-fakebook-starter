import { useRef, useState } from "react";

import { Alert, Button, Form } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [token, setToken] = useState("");
  const [hasError, setHasError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios.post("http://localhost:8080/auth/signup", { username, password })
      .then(({ data }) => {
        setHasError(false);
        setToken(data.token);
      })
      .catch((error) => {
        console.dir(error)
        setHasError(true);
      })

  }

  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      {hasError && (
        <Alert variant="danger">
          An error occurred (this is an unhelpful message that we shall improve later)
        </Alert>
      )}
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={usernameRef} type="text" placeholder="Enter your new username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={passwordRef} type="password" placeholder="Enter a strong password" />
      </Form.Group>
      <Button className="mt-2" variant="primary" type="submit">
        Submit
      </Button>
      <p>{token}</p>
    </Form>
  );
};

export default RegisterForm;