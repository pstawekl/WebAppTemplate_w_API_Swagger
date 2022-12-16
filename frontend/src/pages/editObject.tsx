import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Accordion } from "react-bootstrap";
import './styles/object.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { ModelObject as Object } from "../models";
import { EditObjectRequest, GetObjectRequest, ObjectApi } from "../apis";

export default function EditObjectByApi(): JSX.Element {
    let [object, setObject] = useState<Object>({ id: "", description: "", value: "" });
    let [descritpion, setDescription] = useState<string>("");
    let [objectValue, setObjectValue] = useState<string>("");
    let [resStatus, setResStatus] = useState<number>(0);

    const navigate = useNavigate();
    const location: String = window.location.toString();
    const queriedObject: string = location.split('?')[1];
    const objectApi: ObjectApi = new ObjectApi();

    useEffect(() => {
        try {
            let getObjectReq: GetObjectRequest = { objectId: queriedObject };
            objectApi.getObject(getObjectReq)
                .then(response => {
                    console.log("Tada:", response);
                    if (object != undefined)
                        setObject(response);
                })
        } catch (err) {
            console.error(err)
        }
    }, [])

    const EditObject = (event: React.MouseEvent) => {
        try {
            event.preventDefault();
            console.log("object przed fetchem", object)
            if (object.id != "" && descritpion != "" && objectValue != "") {
                const editTankReq: EditObjectRequest = { objectId: object.id, modelObject: object };
                objectApi.editObject(editTankReq);
            }
            setTimeout(() => navigate('/object'), 1500);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="body">
            <h3>{<FontAwesomeIcon icon={faArrowLeft} className='fontAwesomeButton' onClick={() => navigate('/')} />}    Edycja zbiornika</h3>
            <hr />
            {resStatus == 0 ?
                <div role="alert"></div>
                :
                object.id != "" && descritpion != "" && objectValue != "" ?
                    (resStatus == 200 ?
                        <div className="alert alert-success" role="alert">
                            {(document.getElementById('txtDescription') as HTMLInputElement).value = ""}
                            {(document.getElementById('txtObjectValue') as HTMLInputElement).value = ""}
                            <strong>Sukces!</strong> Obiekt został zaktualizowany.
                        </div>
                        :
                        (
                            <div className="alert alert-danger" role="alert">
                                <strong>Błąd!</strong> Obiekt nie został zaktualizowany. Kod błędu: {resStatus.toString()}
                            </div>))
                    :
                    <div className="alert alert-danger" role="alert">
                        Uzupełnij wszystkie pola!
                    </div>
            }

            {Object(object)['id'] != undefined ?
                <div className="body">
                    <h3>{Object(object)['display_name']}</h3>
                    <hr />
                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Opis obiektu: {object.description}</Accordion.Header>
                            <Accordion.Body>
                                <Form.Control id="txtDescription" type="text"
                                    onChange={(event) => { object.description = event.target.value }}
                                    placeholder={"Podaj nowy opis obiektu..."} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Wartość obiektu: {object.value}</Accordion.Header>
                            <Accordion.Body>
                                <Form.Control id="txtObjectValue" type="text"
                                    onChange={(event) => { object.value = event.target.value }}
                                    placeholder={"Podaj nową wartość obiektu..."} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Id obiektu</Accordion.Header>
                            <Accordion.Body>
                                <Form.Text>{object.id}</Form.Text>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Button as="input" className="btn-secondary" variant="secondary" onClick={(e) => EditObject(e)} value="Edytuj" />
                        <Form.Text>* - wyświetlane treści przed edycją to wartości danego obiektu w bazie danych.</Form.Text>
                    </Accordion>

                </div>
                :
                <div className="tank">
                    <h3>Nie znaleziono takiego obiektu w bazie danych</h3>
                </div>
            }
        </div>


    )
}