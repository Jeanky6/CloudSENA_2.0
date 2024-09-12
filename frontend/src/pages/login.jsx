import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import { CDBBtn, CDBIcon } from "cdbreact";
import URL from "../constants/api";
import "./login.css";
import { Stack, Alert } from "@mui/material";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login/register");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${URL.API}/login`, login);
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 5000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.log(error.response.data);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  return (
    <Container>
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error" variant="filled">
            Usuario o contraseña Incorrecta
          </Alert>
        </Stack>
      )}
      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert security="success" variant="filled">
            Inicio de sesión exitoso, redirigiendo...
          </Alert>
        </Stack>
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card
            className="bg-light text-dark my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <img src="/logo1.png" alt="logo" />
              <h2 className="fw-bold mb-2 text-uppercase">Iniciar Sesion</h2>
              <p className="text-dark-50 mb-5">
                Ingrese su Email y su contraseña
              </p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <center>
                    <Form.Label>Email</Form.Label>
                  </center>
                  <Form.Control
                    className="inputtt"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <center>
                    <Form.Label>Contraseña</Form.Label>
                  </center>
                  <Form.Control
                    className="inputtt"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                </Form.Group>
                <br />
                <center>
                  <CDBBtn className="Buttonn" onClick={handleSubmit}>
                    <CDBIcon icon="fa-solid fa-user" className="" />
                    Iniciar Sesion
                  </CDBBtn>
                  <Card.Link onClick={handleNavigate}>
                    Si no tiene cuenta, Regístrese
                  </Card.Link>
                </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
