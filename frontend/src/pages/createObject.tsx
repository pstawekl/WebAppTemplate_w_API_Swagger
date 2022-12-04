import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/object.css'
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ModelObject as Object } from "../models/ModelObject";
import { ObjectApi, CreateObjectRequest } from "../apis";

export default function CreatePortByApi(): JSX.Element {
    let [object, setObject] = useState<Object>({ id: '', description: '', value: '' });
    let [resStatus, setResStatus] = useState<number>(0);
    const navigate = useNavigate();

    function clearForm() {
        (document.getElementById("txtTankName") as HTMLInputElement).value = "";
        (document.getElementById("txtTankAddress") as HTMLInputElement).value = "";
        (document.getElementById("txtTankType") as HTMLInputElement).value = "";
        (document.getElementById("txtTankId") as HTMLInputElement).value = "";
    }

    async function ResponseToApi() {
        if (object.description != "undefined" && object.value != "undefined" && object.id != "undefined") {
            try {
                const objectReq: CreateObjectRequest = {  modelObject: object };
                const objectApi = new ObjectApi();
                console.log(object)
                objectApi.createObject(objectReq).then(() => { setResStatus(200); clearForm() });

                setTimeout(() => navigate('/object'), 1500);
            } catch (err) {
                console.error(err);
            }
        } else {
            setResStatus(401);
        }
    }

    return (
        <div className="body">
            {(resStatus === 400
                ?
                <div className="alert alert-danger" role="alert">
                    <p>{resStatus} - Niespodziewany błąd.</p>
                </div>
                :
                (resStatus === 200 ? <div className="alert alert-success" role="alert">
                    <p>Obiekt został poprawnie dodany do bazy</p>
                </div> : (resStatus === 401 ? <div className="alert alert-danger" role="alert">
                    <p>{resStatus} - Wypełnij wszystkie pola.</p>
                </div> : <div></div>))
            )}
            <h3>{<FontAwesomeIcon icon={faArrowLeft} className='fontAwesomeButton' onClick={() => navigate('/object')} />} Utwórz nowy obiekt</h3>
            <hr />
            <Form className="requestForm">
                <Form.Label>Opis obiektu:</Form.Label>
                <Form.Control id="txtDescription" type="text" placeholder="podaj opis obiektu..."
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            setObject({ id: object.id, description: (document.getElementById("txtDescription") as HTMLInputElement).value, value: object.value});
                        }
                    }}
                    onChange={(event) => { setObject({ id: object.id, description: event.target.value, value: object.value }); }} />
                <Form.Label>Wartość obiektu:</Form.Label>
                <Form.Control id="txtValue" type="text" placeholder="podaj wartość obiektu..."
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            setObject({ id: object.id, description: object.description, value: (document.getElementById("txtValue") as HTMLInputElement).value });
                        }
                    }}
                    onChange={(event) => { setObject({ id: object.id, description: object.description, value: event.target.value }); }} />
                <Form.Label>Id obiektu:</Form.Label>
                <Form.Control id="txtObjectId" type="text" placeholder="podaj id obiektu..."
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            setObject({ id: (document.getElementById("txtObjectId") as HTMLInputElement).value, description: object.description, value: object.value });
                        }
                    }}
                    onChange={(event) => { setObject({ id: event.target.value, description: object.description, value: object.value }); }} />
                <Form.Text className="bottom-text" color="gray">przykładowe id zbiornika:<i> tank1</i></Form.Text>
                <Button className="btn-dark" variant="dark" type="submit" onClick={(event) => { event.preventDefault(); ResponseToApi() }}>
                    Utwórz
                </Button>
            </Form>
        </div>
    );
}

