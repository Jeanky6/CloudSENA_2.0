import React from "react";
import "../Principal2/principal2.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="tittlee text-center">
        <h2 className="fw-bold mb-2 text-uppercase">
          Categorías de Proyectos
        </h2>
        <p className="text-dark-50 mb-4">
          Seleccione el tipo de proyecto que desea crear...
        </p>
      </div>
      <div className="card-containerr">
        <div className="cardd" onClick={() => handleCardClick('/proyecto')}>
          <div className="face face1">
            <div className="content">
            <img className="imgsena" src="/logosena.png"></img>
              <h3>Proyectos Formativos</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
            </div>
          </div>
        </div>
        <div className="cardd" onClick={() => handleCardClick('/Cproyectosem')}>
          <div className="face face1">
            <div className="content">
            <img className="imgsena" src="/logosena.png"></img>
              <h3>Proyectos Semilleros</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
            </div>
          </div>
        </div>
        <div className="cardd" onClick={() => handleCardClick('/Cproyectoseno')}>
          <div className="face face1">
            <div className="content">
            <img className="imgsena" src="/logosena.png"></img>
              <h3>Proyectos Sennova</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
