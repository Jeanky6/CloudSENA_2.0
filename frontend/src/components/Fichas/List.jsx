import React, { useEffect, useState } from 'react';
import { Card, Spinner, Row, Col, Pagination, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from "cdbreact";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './list.css'; // Asegúrate de tener el archivo CSS correcto
import URL from '../../constants/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

function EditarF() {
    const [ficha, setFicha] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8; // Define la cantidad deseada de elementos por página
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${URL.API}/api/v1/ficha`)
            .then((response) => {
                setFicha(response.data.fichas);
                setSearchResults(response.data.fichas);
                console.log(response.data.fichas);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching fichas:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filteredResults = ficha.filter(({ nombre }) => (
            nombre?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setSearchResults(filteredResults);
    }, [searchTerm, ficha]);

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
        navigate(`/editarFicha/${id}`);
    };
    const handleNavigate = () => {
        navigate('/ficha');
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
                            placeholder="Buscar ficha..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <br />
                    </Form.Group>
                    <center>
                        
                        <CDBBtn className='Buttonn' onClick={() => handleNavigate()} style={{width:'100%'}}>
                            <CDBIcon icon="fa-solid fa-plus" className="ms-1" />
                            Crear Fichas
                        </CDBBtn>
                    </center>
                    
                    <Row>
                        {currentItems.map(({ _id, nombre, fecha_inicio, fecha_fin }) => (
                            <Col key={_id} md={6}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>Fecha Inicio:</strong> {fecha_inicio}<br />
                                            <strong>Fecha Fin:</strong> {fecha_fin}<br />
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
