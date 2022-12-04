import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

export default function NotFound() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h3>404 Not Found</h3>
                        <hr />
                        <div className="error-details" style={{ fontSize: "1.5rem", paddingBottom: "10px" }}>
                            Wystąpił błąd, poszukiwana strona nie istnieje!
                        </div>
                        <div className="error-actions" style={{ justifyContent: "center" }}>
                            <a href="/" className="btn btn-secondary btn-lg">
                                {/* <span className="glyphicon glyphicon-home"></span> */}
                                <p style={{ fontSize: "1.5rem", margin: "auto" }}>Wróć na stronę główną</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}