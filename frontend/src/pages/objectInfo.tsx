import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ModelObject as Object } from "../models";
import { GetObjectRequest, ObjectApi } from "../apis";
import './styles/object.css'

export default function GetObjectInfoFromApi(): JSX.Element {
    const navigate = useNavigate();
    let [object, setObject] = useState<Object>({ id: '', description: '', value: '' });
    let [queriedObject, setQueriedObject] = useState<string>("");

    const location = window.location.toString();
    queriedObject = location.split('?')[1];

    if (queriedObject != null && queriedObject != "") {
        const objectApi = new ObjectApi();

        let objectReq: GetObjectRequest = { objectId: queriedObject };
        objectReq.objectId = queriedObject;
        useEffect(() => {
            objectApi.getObject(objectReq)
                .then(response => {
                    console.log("Tada:", response);
                    if (object != undefined)
                        setObject(response);
                }).catch(response => setObject({ id: 'undefined', description: 'undefined', value: 'undefined' }))
        }, [])
    }

    return (
        <div className="body">
            <h3><FontAwesomeIcon icon={faArrowLeft} className='fontAwesomeButton' onClick={() => navigate('/object')} />Wyszukaj zbiornik w bazie</h3>
            <hr />
            {
                (
                    object.id != undefined || object.id != '' ?
                        <div className="body">
                            <h3>Obiekt nr. {object.id.replace('object','')}</h3>
                            <hr />
                            <div>ID obiektu: {object.id}</div>
                            <div>Wartość obiektu: {object.value}</div>
                            <div>Opis obiektu: {object.description}</div>
                        </div>
                        :
                        <div>
                            <h1>Nie odnaleziono zbiornika w bazie.</h1>
                        </div>
                )
            }
        </div>

    )
}