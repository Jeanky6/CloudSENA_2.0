import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { CDBBtn, CDBIcon } from "cdbreact";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CproyectosSem.css";
import URL from "../../constants/api";
import { Alert, Stack } from "@mui/material";

axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

function SubirArchivos() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    autores: "",
    ficha: "",
    fecha: "",
    descripcion: "",
    objetivoGeneral: "",
    objetivosEspecificos: [{ descripcion: "", finalizado: false, actividades: [] }],
  });
  const navigate = useNavigate();
  const [documentacionFiles, setDocumentacionFiles] = useState([]);
  const [imagenFiles, setImagenFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL.API}/api/v1/ficha`)
      .then((response) => {
        setFichas(response.data.fichas);
      })
      .catch((error) => {
        console.error("Error al obtener las fichas:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleObjetivoEspecificoChange = (index, value) => {
    const newObjetivosEspecificos = [...projectData.objetivosEspecificos];
    newObjetivosEspecificos[index] = { 
      ...newObjetivosEspecificos[index],
      descripcion: value 
    };
    setProjectData((prevData) => ({
      ...prevData,
      objetivosEspecificos: newObjetivosEspecificos,
    }));
  };

  const addObjetivoEspecifico = () => {
    setProjectData((prevData) => ({
      ...prevData,
      objetivosEspecificos: [...prevData.objetivosEspecificos, { descripcion: "", finalizado: false, actividades: [] }],
    }));
  };

  const removeObjetivoEspecifico = (index) => {
    const newObjetivosEspecificos = projectData.objetivosEspecificos.filter((_, i) => i !== index);
    setProjectData((prevData) => ({
      ...prevData,
      objetivosEspecificos: newObjetivosEspecificos,
    }));
  };

  const handleActividadChange = (objetivoIndex, actividadIndex, value) => {
    const newObjetivosEspecificos = [...projectData.objetivosEspecificos];
    newObjetivosEspecificos[objetivoIndex].actividades[actividadIndex] = {
      ...newObjetivosEspecificos[objetivoIndex].actividades[actividadIndex],
      descripcion: value,
      finalizado: false
    };
    setProjectData((prevData) => ({
      ...prevData,
      objetivosEspecificos: newObjetivosEspecificos,
    }));
  };

  const addActividad = (objetivoIndex) => {
    const newObjetivosEspecificos = [...projectData.objetivosEspecificos];
    newObjetivosEspecificos[objetivoIndex].actividades.push({ descripcion: "", finalizado: false });
    setProjectData((prevData) => ({
      ...prevData,
      objetivosEspecificos: newObjetivosEspecificos,
    }));
  };

  const removeActividad = (objetivoIndex, actividadIndex) => {
    const newObjetivosEspecificos = [...projectData.objetivosEspecificos];
    newObjetivosEspecificos[objetivoIndex].actividades.splice(actividadIndex, 1);
    setProjectData((prevData) => ({
      ...prevData,
      objetivosEspecificos: newObjetivosEspecificos,
    }));
  };

  const handleFileChange = (event, fileType) => {
    const files = [...event.target.files];

    switch (fileType) {
      case "documentacion":
        setDocumentacionFiles(files);
        break;
      case "imagen":
        setImagenFiles(files);
        break;
      case "video":
        setVideoFiles(files);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectData.projectName);
    formData.append("autores", projectData.autores);
    formData.append("ficha", projectData.ficha);
    formData.append("fecha", projectData.fecha);
    formData.append("descripcion", projectData.descripcion);
    formData.append("objetivoGeneral", projectData.objetivoGeneral);
    formData.append("objetivosEspecificos", JSON.stringify(projectData.objetivosEspecificos));

    documentacionFiles.forEach((file) => {
      formData.append("files", file);
    });

    imagenFiles.forEach((file) => {
      formData.append("files", file);
    });

    videoFiles.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post(`${URL.API}/api/v1/ProyectoSem`, formData)
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
        setSuccess(false);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };


  return (
    <Container fluid className="my-4">
      {success && (
        <Stack className="alert3" sx={{ width: "100%", marginLeft: "30%", marginBottom: "3px" }} spacing={2}>
          <Alert severity="success" variant="filled">
            Proyecto creado con éxito
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al crear proyecto
          </Alert>
        </Stack>
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="carddddd" style={{ borderRadius: "1rem" }}>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">Crear Proyecto</h2>
              <p className="text-dark-50 mb-4 text-center">Ingrese los siguientes campos</p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formProjectName" className="mb-3">
                      <Form.Label>Nombre del Proyecto</Form.Label>
                      <Form.Control
                        type="text"
                        name="projectName"
                        value={projectData.projectName}
                        onChange={handleInputChange}
                        placeholder="Nombre del proyecto"
                      />
                    </Form.Group>
                    <Form.Group controlId="formAutores" className="mb-3">
                      <Form.Label>Autores</Form.Label>
                      <Form.Control
                        type="text"
                        name="autores"
                        value={projectData.autores}
                        onChange={handleInputChange}
                        placeholder="Autores del proyecto"
                      />
                    </Form.Group>
                    <Form.Group controlId="formFicha" className="mb-3">
                      <Form.Label>Ficha</Form.Label>
                      <Form.Control
                        as="select"
                        name="ficha"
                        value={projectData.ficha}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar Ficha</option>
                        {fichas.map((ficha) => (
                          <option key={ficha._id} value={ficha._id}>
                            {ficha.nombre}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDescripcion" className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="descripcion"
                        value={projectData.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción del proyecto"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formFecha" className="mb-3">
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha"
                        value={projectData.fecha}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDocumentacion" className="mb-3">
                      <Form.Label>Subir Documentación</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={(event) => handleFileChange(event, "documentacion")}
                      />
                    </Form.Group>
                    <Form.Group controlId="formImagen" className="mb-3">
                      <Form.Label>Subir Imágenes</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={(event) => handleFileChange(event, "imagen")}
                      />
                    </Form.Group>
                    <Form.Group controlId="formVideo" className="mb-3">
                      <Form.Label>Subir Video</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={(event) => handleFileChange(event, "video")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group controlId="formObjetivoGeneral" className="mb-3">
                      <Form.Label>Objetivo General</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="objetivoGeneral"
                        value={projectData.objetivoGeneral}
                        onChange={handleInputChange}
                        placeholder="Objetivo general del proyecto"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group controlId="formObjetivosEspecificos" className="mb-3">
                      <Form.Label>Objetivos Específicos</Form.Label>
                      {projectData.objetivosEspecificos.map((objetivo, objetivoIndex) => (
                        <div key={objetivoIndex} className="mb-3">
                          <div className="d-flex mb-2">
                            <Form.Control
                              type="text"
                              value={objetivo.descripcion}
                              onChange={(e) => handleObjetivoEspecificoChange(objetivoIndex, e.target.value)}
                              placeholder={`Objetivo específico ${objetivoIndex + 1}`}
                            />
                            <Button
                              variant="danger"
                              onClick={() => removeObjetivoEspecifico(objetivoIndex)}
                              className="ms-2"
                            >
                              <CDBIcon icon="trash" />
                            </Button>
                          </div>
                          <div className="ms-4">
                            <Form.Label>Actividades</Form.Label>
                            {objetivo.actividades.map((actividad, actividadIndex) => (
                              <div key={actividadIndex} className="d-flex mb-2">
                                <Form.Control
                                  type="text"
                                  value={actividad.descripcion}
                                  onChange={(e) => handleActividadChange(objetivoIndex, actividadIndex, e.target.value)}
                                  placeholder={`Actividad ${actividadIndex + 1}`}
                                />
                                
                                
                                
                                <Button
                                  variant="danger"
                                  onClick={() => removeActividad(objetivoIndex, actividadIndex)}
                                  className="ms-2"
                                >
                                  <CDBIcon icon="trash" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="secondary" onClick={() => addActividad(objetivoIndex)} className="mt-2">
                              <CDBIcon icon="plus" /> Agregar Actividad
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="secondary" onClick={addObjetivoEspecifico} className="mt-2">
                        <CDBIcon icon="plus" /> Agregar Objetivo Específico
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <CDBBtn type="submit" className="Buttonn">
                    <CDBIcon icon="fa-solid fa-plus" className="ms-1" />
                    Crear Proyecto
                  </CDBBtn>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SubirArchivos;