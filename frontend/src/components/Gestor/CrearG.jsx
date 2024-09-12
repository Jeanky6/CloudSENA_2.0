import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../EditarProyecto/list.css";
import { useNavigate } from "react-router-dom";
import { CDBBtn, CDBIcon, CDBContainer } from "cdbreact";
import URL from "../../constants/api";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("token")}`;
function List() {
  const [gestor, setGestor] = useState({
    nombre: "",
    documento: "",
    celular: "",
    correo: "",
    ficha: "",
  });
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL.API}/api/v1/ficha`)
      .then((response) => setFichas(response.data.fichas))
      .catch((error) => console.error("Error fetching fichas:", error));
  }, []);

  const handleSubmit = async () => {
    try {
      axios
        .post(`${URL.API}/api/v1/gestor`, gestor)
        .then(function (response) {
          console.log(response.data);
          alert("Gestor Creado");
          navigate("/gestor");
        })
        .catch(function (error) {
          alert("Hubo un error al crear el gestor");
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setGestor({
      ...gestor,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container fluid className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd" style={{ borderRadius: "1rem" }}>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Crear Gestor
              </h2>
              <p className="text-dark-50 mb-4 text-center">
                Ingrese los siguientes campos
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={gestor.nombre}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDocumento">
                      <Form.Label>Documento</Form.Label>
                      <Form.Control
                        name="documento"
                        value={gestor.documento}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formCelular">
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        name="celular"
                        value={gestor.celular}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCorreo">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        name="correo"
                        value={gestor.correo}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <center>
                  <div>
                    <CDBBtn className="Buttonn" onClick={handleSubmit}>
                      <CDBIcon icon="fa-solid fa-plus" className="ms-1" />
                      Crear Gestor
                    </CDBBtn>
                  </div>
                </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default List;
