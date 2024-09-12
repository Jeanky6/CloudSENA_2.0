import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './../CrearProyecto/cproyectos.css'; // Asegúrate de crear este archivo para las clases CSS adicionales
import URL from '../../constants/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
function List() {
    const [ficha, setFicha] = useState({
        nombre: '',
        codigo: '',
        tipo: '',
        fecha_inicio: '',
        fecha_fin: '',
        gestor: '',
    });

    const [gestores, setGestores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${URL.API}/api/v1/gestor`)
            .then(response => setGestores(response.data.gestors))
            .catch(error => console.error('Error fetching gestores:', error));

        axios.get(`${URL.API}/login`)
            .then(response => setUsuarios(response.data.users))
            .catch(error => console.error('Error fetching usuarios:', error));
    }, []);

    const handleInputChange = (e) => {
        setFicha({
            ...ficha,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            axios.post(`${URL.API}/api/v1/ficha`, ficha)
                .then(function (response) {
                    console.log(response.data);
                    alert("Ficha Creada");
                    navigate('/fichas');
                })
                .catch(function (error) {
                    alert("El Email ya se encuentra registrado");
                    console.log(error.response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container fluid className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className='carddddd' style={{ borderRadius: '1rem' }}>
                        <Card.Body className='p-4'>
                            <h2 className="fw-bold mb-2 text-uppercase text-center">Crear Ficha</h2>
                            <p className="text-dark-50 mb-4 text-center">Ingrese los siguientes campos</p>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="formNombre">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                name="nombre"
                                                value={ficha.nombre}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formCodigo">
                                            <Form.Label>Código</Form.Label>
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
                                    </Col>

                                    <Col xs={12} md={6}>
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
                                            <Form.Control as="select"
                                                name="gestor"
                                                value={ficha.gestor}
                                                onChange={handleInputChange}
                                            >
                                                <option>Seleccione Gestor</option>
                                                {gestores.map(g => (
                                                    <option key={g._id} value={g._id}>{g.nombre}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="text-center mt-4">
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Crear
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

export default List;
