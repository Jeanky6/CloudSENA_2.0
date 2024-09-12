import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Pagination, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './list.css';
import { CDBBtn, CDBIcon } from "cdbreact";
import URL from '../../constants/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

function List() {
  const [proyecto, setProyecto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${URL.API}/api/v1/ProyectoSem`)
      .then((response) => {
        setProyecto(response.data.proyectos);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const filteredProjects = proyecto.filter(project =>
    project.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = (projectId) => {
    navigate(`/detailssem/${projectId}`);
  };

  return (
    <div className="card-container">
      <Form.Group controlId="searchForm">
        <Form.Control
          className='buscarp'
          type="text"
          placeholder="Buscar proyecto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
      </Form.Group>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className="card-row">
            {currentProjects.map(({ _id, nombre, autores, ficha, fecha, imagenes }) => (
              <Card key={_id} className="custom-card-style">
                <Card.Body>
                  <Card.Img variant="top" src={imagenes} alt={`${nombre} Image`} />
                  <Card.Title>{nombre} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{autores}</Card.Subtitle>
                  <Card.Text>
                    <strong>Ficha:</strong> {ficha?.[0]?.nombre}<br />
                    <strong>Fecha:</strong> {fecha}<br />
                  </Card.Text>
                  <CDBBtn className='Buttonn' onClick={() => handleDetailsClick(_id)}>
                    <CDBIcon icon="fa-solid fa-eye" className="ms-1" /> 
                    Ver Detalles
                  </CDBBtn>
                </Card.Body>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-3">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

export default List;
