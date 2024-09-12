import {
    Card,
    Button,
    Spinner,
    Col,
    Container,
    Form,
    Row,
    Image,
    Alert,
  } from "react-bootstrap";
  import "./list.css";
  
  function List() {
    return (
      <div className="cardp">
        {/* Agrupa las cards en contenedores de filas */}
        <div className="card-row">
          <Card className="custom-card">
            <Card.Body class="p">
              <br />
              <Card.Title className="titulo">Editar</Card.Title>
              <div class="fields">
                <div class="input-field">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Nombre del proyecto"
                    name="nombre"
                  />
                </div>
                <div class="input-field">
                  <Form.Label> Autores </Form.Label>
  
                  <Form.Control
                    type="input"
                    name="autores"
                    placeholder="Autores del proyecto"
                  />
                </div>
                <div class="input-field">
                  <Form.Label> Ficha </Form.Label>
  
                  <Form.Control
                    type="input"
                    name="ficha"
                    placeholder="Ingrese su ficha"
                  />
                </div>
                <div class="input-field">
                  <Form.Label> Descripcion </Form.Label>
  
                  <Form.Control
                    type="input"
                    name="descripcion"
                    placeholder="Ingrese la descripcion"
                  />
                </div>
                <div class="input-field">
                  <Form.Label> Fecha </Form.Label>
  
                  <Form.Control type="date" name="fecha" />
                </div>
  
                <div class="input-field">
                  <Form.Label> Documentacion </Form.Label>
  
                  <Form.Control type="file" name="fecha" />
                </div>
                <div class="input-field">
                  <Form.Label> Imagen </Form.Label>
  
                  <Form.Control type="file" name="fecha" />
                </div>
                <div class="input-field">
                  <Form.Label> Video </Form.Label>
  
                  <Form.Control type="file" name="fecha" />
                </div>
              </div>
  
              <br />
              <center>
              <Button className="Buttonn">Editar</Button>
              </center>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
  
  export default List;
