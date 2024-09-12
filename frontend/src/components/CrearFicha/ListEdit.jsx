import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../CrearProyecto/cproyectos.css';
import URL from '../../constants/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

function Edit() {
  const { id } = useParams();

  const [ficha, setFicha] = useState({
    nombre: '',
    codigo: '',
    tipo: '',
    fecha_inicio: '',
    fecha_fin: '',
    gestor: '',
    usuario: '',
  });

  const [gestores, setGestores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/ficha/${id}`)
      .then(res => {
        setFicha(res.data.ficha);
        console.log(res.data);
      })
      .catch(err => console.log(err));

    axios.get(`${URL.API}/api/v1/gestor`)
      .then(res => setGestores(res.data.gestors));

    axios.get(`${URL.API}/api/v1/login`)
      .then(res => setUsuarios(res.data.users));
  }, []);

  const handleInputChange = (e) => {
    setFicha({
      ...ficha,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${URL.API}/api/v1/ficha/${id}`, ficha);
      alert('Ficha actualizada');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='cardddd' style={{ borderRadius: '1rem', maxWidth: '90000px' }}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
            <h2 className="fw-bold mb-2 text-uppercase">Editar Ficha</h2>
            <p className="text-dark-50 mb-5">Ingrese los siguientes campos</p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={ficha.nombre}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCodigo">
                      <Form.Label>Codigo</Form.Label>
                      <Form.Control
                        name="codigo"
                        value={ficha.codigo}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTipo">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
                        name="tipo"
                        value={ficha.tipo}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUsuario">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Select
                        name="usuario"
                        value={ficha.usuario}
                        onChange={handleInputChange}
                      >
                        {usuarios.map(u => (
                          <option key={u._id} value={u._id} selected={ficha.usuario === u._id} >{u.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formFechaInicio">
                      <Form.Label>Fecha de Inicio</Form.Label>
                      <Form.Control
                        name="fecha_inicio"
                        value={ficha.fecha_inicio}
                        onChange={handleInputChange}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFechaFin">
                      <Form.Label>Fecha de Fin</Form.Label>
                      <Form.Control
                        name="fecha_fin"
                        value={ficha.fecha_fin}
                        onChange={handleInputChange}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGestor">
                      <Form.Label>Gestor</Form.Label>
                      <Form.Select
                        name="gestor"
                        value={ficha.gestor}
                        onChange={handleInputChange}
                      >
                        {gestores.map(g => (
                          <option key={g._id} value={g._id} selected={ficha.gestor === g._id} >{g.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <br/>
                <center>
                  <Button variant='primary' type="submit">
                    Actualizar Ficha
                  </Button>
                </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Edit;
