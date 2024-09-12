import React, { useEffect, useState } from 'react';
import { Card, Spinner, Row, Col, Pagination, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from "cdbreact";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CrearProyecto/cproyectos.css'; // Asegúrate de tener el archivo CSS correcto
import URL from '../../constants/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

function EditarF() {
    const [gestores, setGestores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8; // Define la cantidad deseada de elementos por página
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${URL.API}/api/v1/gestor`)
            .then((response) => {
                console.log(response.data);
                if (response.data && response.data.gestors) {
                    setGestores(response.data.gestors);
                    setSearchResults(response.data.gestors);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching gestores:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filteredResults = gestores.filter(({ nombre }) => (
            nombre?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setSearchResults(filteredResults);
    }, [searchTerm, gestores]);

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = searchResults.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/editarGestor/${id}`);
    };

    const handleNavigate = () => {
        navigate('/Cgestor');
    }

    return (
        <div className="list-container">
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <div>
                    <Form.Group controlId="searchForm">
                        <Form.Control
                            className='buscarp'
                            type="text"
                            placeholder="Buscar gestor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <br />
                    </Form.Group>
                    <center>
                        <CDBBtn className='Buttonn' onClick={() => handleNavigate()} style={{width:'100%'}}>
                            <CDBIcon icon="fa-solid fa-plus" className="ms-1" />
                            Crear Gestor
                        </CDBBtn>
                    </center>
                    
                    <Row>
                        {currentItems.map(({ _id, nombre, documento, celular, correo}) => (
                            <Col key={_id} md={6}>
                                <Card className="mb-3" style={{ minWidth: '17rem' }}>
                                    <Card.Body>
                                        <Card.Title>{nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>Documento:</strong> {documento}<br />
                                            <strong>Celular:</strong> {celular}<br />
                                            <strong>Correo:</strong> {correo}<br />
                                        </Card.Text>
                                        <CDBBtn className='Buttonn' onClick={() => handleEdit(_id)}>
                                            <CDBIcon icon="fa-solid fa-edit" className="ms-1" />
                                            Editar
                                        </CDBBtn>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="pagination-container">
                        <Pagination>
                            <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                            {[...Array(totalPages).keys()].map((pageNumber) => (
                                <Pagination.Item
                                    key={pageNumber + 1}
                                    active={pageNumber + 1 === currentPage}
                                    onClick={() => handlePageChange(pageNumber + 1)}
                                >
                                    {pageNumber + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditarF;
