import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CrearProyecto/cproyectos.css';
import URL from '../../constants/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
function EditarGestor() {
  const { id } = useParams();

  const [gestor, setGestor] = useState({
    nombre: '',
    documento: '',
    celular: '',
    correo: '',
    ficha: ''
  });
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/gestor/${id}`)
      .then(res => {
        setGestor(res.data.gestor);
        console.log(res.data);
      })
      .catch(err => console.log(err));

    axios.get(`${URL.API}/api/v1/ficha`)
      .then(res => setFichas(res.data.fichas));
  }, [id]);

  const handleInputChange = (e) => {
    setGestor({
      ...gestor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${URL.API}/api/v1/gestor/${id}`, gestor);
      alert('Gestor actualizado');
      navigate('/gestor');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='cardddd' style={{ borderRadius: '1rem', maxWidth: '900px' }}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Editar Gestor</h2>
              <p className="text-dark-50 mb-5">Ingrese los siguientes campos</p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
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
                        type="email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFicha">
                      <Form.Label>Ficha</Form.Label>
                      <Form.Select
                        name="ficha"
                        value={gestor.ficha}
                        onChange={handleInputChange}
                      >
                        {fichas.map(f => (
                          <option key={f._id} value={f._id} selected={gestor.ficha === f._id} >{f.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <br/>
                <center>
                  <Button variant='primary' type="submit">
                    Actualizar Gestor
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

export default EditarGestor;
