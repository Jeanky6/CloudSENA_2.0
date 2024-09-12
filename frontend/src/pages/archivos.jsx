import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

function SubirArchivos() {
    const [projectName, setProjectName] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleInputChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("projectName", projectName);
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        axios.post('https://cloudsena-itj7.onrender.com/api/v1/proyecto/upload', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <Form.Group controlId="formProjectName">
                <Form.Label>Nombre del Proyecto</Form.Label>
                <Form.Control type="text" value={projectName} onChange={handleInputChange} placeholder="Nombre del proyecto" />
            </Form.Group>
            <Form.Group controlId="formFile" multiple>
                <Form.Label>Subir Archivos</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Subir Archivos
            </Button>
        </Form>
    );
}

export default SubirArchivos;



