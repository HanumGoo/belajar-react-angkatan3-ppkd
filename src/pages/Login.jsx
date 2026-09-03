import { Form, Button, Card, Container, Row, Col, Alert, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const data = response;

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      // console.log(error.response.status);
      if (error.response) {
        if (error.response.status == 422) {
          const rawErrors = error.response.data.error;
          const formatError = {};

          Object.keys(rawErrors).forEach((key) => {
            formatError[key] = rawErrors[key][0];
          });

          setError(formatError);
        } else if (error.response.status == 401) {
          setError({
            message: error.response.data.message,
          });
        } else {
          // console.log(error.response);
        }
      } else {
        setError("Server Error");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 font-weight-bold">Login Form</h3>

              {error.message && <Alert variant="danger">{error?.message}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!error?.email}></Form.Control>
                  <FormControl.Feedback type="invalid">{error?.email}</FormControl.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!error?.password}></Form.Control>
                  <FormControl.Feedback type="invalid">{error?.password}</FormControl.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2 mt-2" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
