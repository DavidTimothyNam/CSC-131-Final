// Login.jsx — triggers Google OAuth and handles token redirect (Bootstrap version)
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If a JWT is returned in the URL, capture it and redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/admin");
    }
  }, [location, navigate]);

  const handleLogin = () => {
    window.location.href = `${process.env.VITE_API_BASE}/auth/google`;
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Admin Login</h2>
            <Button
              variant="primary"
              size="lg"
              onClick={handleLogin}
              className="w-100"
            >
              Sign in with Google
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
