import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash, faPen, faTable } from "@fortawesome/free-solid-svg-icons";
import './styles/object.css'
import { useNavigate } from "react-router-dom";
import ObjectsTable from "./components/objectsTable";
import { ModelObject as Object } from "../models/ModelObject";
import { ObjectApi } from "../apis";

const objectApi: ObjectApi = new ObjectApi();

export default function GetObjectsFromApi(): JSX.Element {
    const navigate = useNavigate();
    let [objects, setObjects] = useState<Array<Object>>([]);    

    function onChange(objects: Array<Object>) {
        console.log('onChange: ', objects);
        setObjects(objects);
    }

    useEffect(() => {
        objectApi.getObjects()
            .then((response) => {
                console.log("Tada:", response);
                setObjects(response);
            })
    }, [])        

    return (
        <div className="body">
            <div className="col-1-1">
                <span className="list-title-bar">Lista zbiorników </span>
                <Button className='listButton' variant="secondary" onClick={() => { navigate('/createObject') }}><FontAwesomeIcon icon={faPlusCircle} /> Dodaj zbiornik</Button>
            </div>

            <hr />
            <div>{
                (objects != undefined ?
                    <Accordion alwaysOpen>
                        {ObjectsTable(objects, onChange)}
                    </Accordion>
                    :
                    <div className="body">
                        <h1>Brak danych</h1>
                        <hr />
                        <div><h3>Objects not found.</h3></div>
                    </div>)
            }</div>
        </div>
    )
}