import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  FormGroup,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { CDBBtn, CDBIcon } from "cdbreact";
import axios from "axios";
import QRCode from "qrcode.react";
import "./DetailPage.css"; // Importa el archivo CSS
import URL from "../../constants/api";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("token")}`;

function DetailPage() {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState({
    nombre: "",
    autores: "",
    ficha: "",
    fecha: "",
    descripcion: "",
    imagenes: [],
    documentacion: "",
    video: "",
    objetivoGeneral: "",
    objetivosEspecificos: [],
  });
  const [codigo, setCodigo] = useState("");
  const [fichaName, setFichaName] = useState("");
  const [currentURL, setCurrentURL] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [showDeletemodal, setShowDeletemodal] = useState(false);
  const [showTrazabilidadModal, setShowTrazabilidadModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL.API}/api/v1/proyecto/${id}`)
      .then((res) => {
        setProjectDetails(res.data.proyecto);
        if (res.data.proyecto.ficha) {
          getFichaName(res.data.proyecto.ficha[0]._id);
        }
      })
      .catch((err) => console.log(err));

    setCurrentURL(window.location.href);
  }, [id]);

  const getFichaName = (fichaId) => {
    axios
      .get(`${URL.API}/api/v1/ficha/${fichaId}`)
      .then((res) => {
        setFichaName(res.data.ficha.nombre);
      })
      .catch((err) => console.log(err));
  };

  const sendCorreo = () => {
    axios
      .post(`${URL.API}/api/v1/proyecto/${id}/send-code`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteProyecto = () => {
    axios
      .delete(`${URL.API}/api/v1/proyecto/${id}?confirmationCode=${codigo}`)
      .then((res) => {
        console.log(res);
        alert("Proyecto Eliminado con Éxito");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCodigo(value);
  };

  const handleObjetivoChange = (objetivoId, checked) => {
    axios
      .put(
        `${URL.API}/api/v1/proyecto/${id}/objetivo-especifico/${objetivoId}`,
        { finalizado: checked },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const updatedObjetivos = projectDetails.objetivosEspecificos.map(
          (objetivo) =>
            objetivo._id === objetivoId
              ? { ...objetivo, finalizado: checked }
              : objetivo
        );
        setProjectDetails({
          ...projectDetails,
          objetivosEspecificos: updatedObjetivos,
        });
      })
      .catch((err) => {
        console.error("Error al actualizar el objetivo:", err);
      });
  };

// frontend/DetailPage.js

// frontend/DetailPage.js

// frontend/DetailPage.js

const handleActividadChange = (objetivoId, actividadId, checked) => {
  console.log("Cambiando estado de la actividad:", { objetivoId, actividadId, checked });

  axios
    .put(
      `${URL.API}/api/v1/proyecto/${id}/objetivo/${objetivoId}/actividad/${actividadId}`,
      { finalizado: checked }, // Aquí no enviamos archivos
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      console.log("Respuesta del servidor:", res.data);

      if (res.data && res.data.proyecto) {
        const updatedObjetivos = res.data.proyecto.objetivosEspecificos.map(
          (objetivo) =>
            objetivo._id === objetivoId
              ? {
                  ...objetivo,
                  actividades: objetivo.actividades.map((actividad) =>
                    actividad._id === actividadId
                      ? { ...actividad, finalizado: checked }
                      : actividad
                  ),
                }
              : objetivo
        );
        setProjectDetails({
          ...projectDetails,
          objetivosEspecificos: updatedObjetivos,
        });
      } else {
        console.error("Estructura de respuesta inesperada", res.data);
      }
    })
    .catch((err) => {
      console.error("Error al actualizar la actividad:", err);
    });
};


  const handleFileUpload = (e, objetivoId, actividadId) => {
    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append("files", file);
    }

    axios
      .put(
        `${URL.API}/api/v1/proyecto/${id}/objetivo/${objetivoId}/actividad/${actividadId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        alert("Archivos subidos exitosamente");
        setProjectDetails(res.data.proyecto); // Actualizar la vista con el proyecto actualizado
      })
      .catch((err) => {
        console.error("Error al subir los archivos:", err);
      });
  };

  const handleCloseQRModal = () => setShowQRModal(false);
  const handleShowQRModal = () => setShowQRModal(true);
  const handleshowdeletemodal = () => {
    setShowDeletemodal(true);
    sendCorreo();
  };
  const handleClosedeletemodal = () => setShowDeletemodal(false);
  const handleShowTrazabilidadModal = () => setShowTrazabilidadModal(true);
  const handleCloseTrazabilidadModal = () => setShowTrazabilidadModal(false);

  const calcularProgresoTotal = () => {
    const objetivosCompletados = projectDetails.objetivosEspecificos.filter(
      (obj) => obj.finalizado
    ).length;
    return (
      (objetivosCompletados / projectDetails.objetivosEspecificos.length) * 100
    );
  };

  return (
    <Container fluid className="detail-page-container">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card className="shadow-sm detail-page-card">
            <Card.Body className="p-5 d-flex flex-column  mx-auto w-100">
              <center>
                <h2 className="fw-bold mb-2 text-uppercase">
                  {projectDetails.nombre}
                </h2>
                <p className="text-dark-50 mb-5">
                  Información detallada del proyecto
                </p>
                {projectDetails.imagenes.length > 0 && (
                  <Card.Img
                    className="detail-page-img mb-3"
                    src={projectDetails.imagenes[0]}
                  />
                )}
                <Card.Text>
                  <strong>Autores:</strong> {projectDetails.autores}
                  <br />
                  <strong>Ficha:</strong> {fichaName}
                  <br />
                  <strong>Fecha:</strong> {projectDetails.fecha}
                  <br />
                  <strong>Descripción:</strong> {projectDetails.descripcion}
                </Card.Text>
              </center>
              {projectDetails.video && (
                <div className="detail-page-video-container my-3">
                  <video
                    className="detail-page-video"
                    src={projectDetails.video}
                    controls
                  ></video>
                </div>
              )}
              {projectDetails.documentacion && (
                <div>
                  <center>
                    <CDBBtn
                      className="Buttonnn"
                      onClick={() =>
                        window.open(projectDetails.documentacion, "_blank")
                      }
                    >
                      <CDBIcon icon="fa-regular fa-file" />
                      Documentacion
                    </CDBBtn>
                  </center>
                </div>
              )}
              <center>
                <CDBBtn className="Buttonnn" onClick={handleShowQRModal}>
                  <CDBIcon icon="qrcode" />
                  Generar QR
                </CDBBtn>
              </center>
              <div>
                <CDBBtn className="Buton" onClick={handleshowdeletemodal}>
                  <CDBIcon icon="times"></CDBIcon>
                  Eliminar
                </CDBBtn>
              </div>
              <div>
                <CDBBtn
                  className="Buttonnn mt-3"
                  onClick={handleShowTrazabilidadModal}
                >
                  <CDBIcon icon="chart-line" />
                  Ver Trazabilidad
                </CDBBtn>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showQRModal} onHide={handleCloseQRModal}>
        <Modal.Header closeButton>
          <Modal.Title>Código QR</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <QRCode value={currentURL} />
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="Buttonn" onClick={handleCloseQRModal}>
            <CDBIcon icon="times" />
            Cerrar
          </CDBBtn>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeletemodal} onHide={handleClosedeletemodal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Se envio un correo al gestor con el codigo de eliminacion</p>
          <FormGroup>
            <Form.Label>Ingrese el codigo:</Form.Label>
            <Form.Control
              className="Type"
              type="text"
              name="codigo"
              onChange={handleInputChange}
              placeholder="Codigo"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="Buttonn" onClick={handleClosedeletemodal}>
            <CDBIcon icon="times" />
            Cerrar
          </CDBBtn>
          <CDBBtn className="Buton" onClick={deleteProyecto}>
            <CDBIcon icon="check" />
            Eliminar
          </CDBBtn>
        </Modal.Footer>
      </Modal>

      {/* Modal Trazabilidad */}
      <Modal
        show={showTrazabilidadModal}
        onHide={handleCloseTrazabilidadModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Trazabilidad del Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Objetivo General</h4>
          <p>{projectDetails.objetivoGeneral}</p>

          <h4>Objetivos Específicos</h4>
          {projectDetails.objetivosEspecificos.map((objetivo, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <p>{objetivo.descripcion}</p>
              </div>
              <ProgressBar
                now={objetivo.finalizado ? 100 : 0}
                label={objetivo.finalizado ? "Completado" : "En progreso"}
                variant={objetivo.finalizado ? "success" : "info"}
              />
             <h4>Actividades</h4>
              {objetivo.actividades.map((actividad, actindex) => (
                <div key={actindex} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>{actividad.descripcion}</p>
                    <Form.Check
                      type="checkbox"
                      label="Finalizado"
                      checked={actividad.finalizado}
                      onChange={(e) =>
                        handleActividadChange(
                          objetivo._id,
                          actividad._id,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                  <ProgressBar
                    now={actividad.finalizado ? 100 : 0}
                    label={actividad.finalizado ? "Completado" : "En progreso"}
                    variant={actividad.finalizado ? "success" : "info"}
                  />

                  {/* Input para subir archivos de resultados */}
                  <Form.Group controlId={`fileUpload-${actividad._id}`}>
                    <Form.Label>Subir resultados:</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileUpload(e, objetivo._id, actividad._id)
                      }
                    />
                  </Form.Group>

                  {/* Mostrar los archivos subidos */}
                  <h6 className="mt-3">Archivos subidos:</h6>
                  {actividad.resultado && actividad.resultado.length > 0 ? (
                    <ul>
                      {actividad.resultado.map((archivo, fileIndex) => (
                        <li key={fileIndex}>
                          <a
                            href={archivo.rutaArchivo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {archivo.nombreArchivo}
                          </a>
                          <img src={archivo.rutaArchivo} className="detail-page-img mb-3" crossOrigin="anonymus"></img>
                        </li>
                        
                      ))}
                    </ul>
                  ) : (
                    <p>No se han subido archivos.</p>
                  )}
                </div>
              ))}
            </div>
          ))}

          <h4 className="mt-4">Progreso Total del Proyecto</h4>
          <ProgressBar
            now={calcularProgresoTotal()}
            label={`${Math.round(calcularProgresoTotal())}%`}
            variant="primary"
          />
        </Modal.Body>
        <Modal.Footer>
          <CDBBtn className="Buttonn" onClick={handleCloseTrazabilidadModal}>
            <CDBIcon icon="times" />
            Cerrar
          </CDBBtn>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DetailPage;
