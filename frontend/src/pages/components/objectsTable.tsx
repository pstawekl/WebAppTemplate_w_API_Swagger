import { faArrowRight, faPen, faTable, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/object.css';
import { ModelObject as Object } from "../../models/ModelObject";
import { ObjectApi } from "../../apis";

export default function ObjectsTable(objects: Array<Object>, onChange: (objects: Array<Object>) => void): any {
    const navigate = useNavigate();
    const objectApi = new ObjectApi();

    function deleteObject(objectId: string, object: Object) {
        if (confirm("Czy na pewno chcesz usunąć ten zbiornik z bazy danych?")) {
            objectApi.deleteObject({ objectId: objectId })
                .then(response => {
                    onChange(objects.filter(o => o.id !== objectId));
                    console.log('usunięto: ', response)
                })

                alert('Obiekt został usunięty \n zostaniesz przekierowany do strony głównej.');
                navigate('/');
                
        }
    }

    function createObjectsTable(objects: Array<Object>) {
        return (
            objects.map((data: any, index: any) => {
                const { id, description, value } = data;
                return (
                    <Row className='objectsRow'>
                        <Col className='col'>{objects[index].description}</Col>
                        <Col className='col'>{objects[index].value}</Col>
                        <Col className='col'>
                            <FontAwesomeIcon icon={faTable} id={objects[index].id} className='fontAwesomeButton' onClick={(event) => { navigate('/getObject?' + event.currentTarget.id) }} />
                            <FontAwesomeIcon icon={faPen} id={objects[index].id} className='fontAwesomeButton' onClick={(event) => { navigate('/editObject?' + event.currentTarget.id) }} />
                            <FontAwesomeIcon icon={faTrash} id={objects[index].id} className='fontAwesomeButton' onClick={(event) => { deleteObject(objects[index].id, objects[index]) }} />
                            <FontAwesomeIcon icon={faArrowRight} id={objects[index].id} className='fontAwesomeButton' onClick={(event) => navigate('/getObject?' + event?.currentTarget.id)} />
                        </Col>
                    </Row>
                )
            })
        )
    }

    return (
        <Container>
            <Row className='objectsRow'>
                <Col>Opis obiektu</Col>
                <Col>Wartość</Col>
                <Col></Col>
            </Row>
            {createObjectsTable(objects)}
        </Container>
    )
}