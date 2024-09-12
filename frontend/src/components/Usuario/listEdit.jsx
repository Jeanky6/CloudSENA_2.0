import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../CrearProyecto/cproyectos.css';
import URL from '../../constants/api';
import { useNavigate } from'react-router-dom';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
function EditU() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
    nombre: '',
    documento: '',
    ficha: '',
    rol: '',
    gestor: '',
  });
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [gestores, setGestores] = useState([]);

  useEffect(() => {
    axios.get(`${URL.API}/login/${id}`)
      .then(res => {
        setUsuario(res.data.user);
        console.log(res.data.user);
      })
      .catch(err => console.log(err));

    axios.get(`${URL.API}/api/v1/ficha`)
      .then(res => setFichas(res.data.fichas));

    axios.get(`${URL.API}/api/v1/rol`)
      .then(res => {
        setRoles(res.data.roles);
        console.log(res.data);
      });

    axios.get(`${URL.API}/api/v1/gestor`)
      .then(res => setGestores(res.data.gestors));
  }, [id]);

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${URL.API}/login/${id}`, usuario);
      alert('Usuario actualizado');
      navigate('/users');
    } catch (err) { 
      console.log(err);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className='carddddd' style={{ borderRadius: '1rem' }}>
            <Card.Body className='p-4'>
              <h2 className="fw-bold mb-2 text-uppercase text-center">Editar Usuario</h2>
              <p className="text-dark-50 mb-4 text-center">Actualice el rol del Usuario</p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        value={usuario.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={usuario.nombre}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDocumento">
                      <Form.Label>Documento</Form.Label>
                      <Form.Control
                        name="documento"
                        value={usuario.documento}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formRol">
                      <Form.Label>Rol</Form.Label>
                      <Form.Select
                        name="rol"
                        value={usuario.rol}
                        onChange={handleInputChange}
                      >
                        {roles.map(r => (
                          <option key={r._id} value={r._id}>{r.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGestor">
                      <Form.Label>Gestor</Form.Label>
                      <Form.Select
                        name="gestor"
                        value={usuario.gestor}
                        onChange={handleInputChange}
                        disabled
                      >
                        {gestores.map(g => (
                          <option key={g._id} value={g._id}>{g.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFicha">
                      <Form.Label>Ficha</Form.Label>
                      <Form.Select
                        name="ficha"
                        value={usuario.ficha}
                        onChange={handleInputChange}
                        disabled
                      >
                        {fichas.map(f => (
                          <option key={f._id} value={f._id}>{f.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <Button variant='primary' type='submit'>
                    Actualizar Usuario
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditU;
