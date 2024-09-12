import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Row, Col, Pagination, Form } from 'react-bootstrap';
import axios from 'axios';
import './list.css'
import { CDBBtn, CDBIcon, CDBContainer, CDBInput } from "cdbreact";
import { useNavigate } from 'react-router-dom';
import URL from '../../constants/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

function List() {
    const [usuario, setUsuario] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL.API}/login`)
            .then((response) => {
                setUsuario(response.data.users);
                setSearchResults(response.data.users);
                setLoading(false);
                console.log(usuario)
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filteredResults = usuario.filter(({ nombre, documento }) => (
            nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            documento.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setSearchResults(filteredResults);
    }, [searchTerm, usuario]);

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
    const handleEdit = (id) => {
        navigate(`/login/${id}`);
    };

    return (
        <div className="list-container">
            <center>
                <div>
                    <Form.Group controlId="searchForm">
                        <Form.Control
                            className='buscarp'
                            type="text"
                            placeholder="Buscar usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <br />
                    </Form.Group>

                </div>
            </center>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <div>
                    <Row>
                        {currentItems.map(({ _id, email, nombre, ficha, documento, rol }) => (
                            <Col key={_id} md={6}>
                                <Card className="mb-3" style={{ minWidth: '17rem' }}>
                                    <Card.Body>
                                        <Card.Title>{nombre}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                                        <Card.Text>
                                            <strong>Documento:</strong> {documento}<br />
                                            <strong>Ficha:</strong> {ficha?.[0]?.nombre}<br />
                                            <strong>Rol:</strong> {rol?.[0]?.name}<br />
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

export default List;
