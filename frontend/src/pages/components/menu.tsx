import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap';
import Logo from './../../assets/logo-agat.png';
import './menu.css'

function MenuNavbar() {
    const styles = {
        navBrand: { fontFamily: 'Roboto, sans-serif', fontSize: '2rem', paddingTop: "15px", fontWeight: 200 },
        navItemNormal: { fontSize: '1.4rem' },
        navLogo: { width: "auto", height: "30px", paddingRight: "20px", marginTop: "-5px" }
    }
    return (
        <Navbar bg="light" expand="lg" style={{ backgroundColor: '/f8f9fa' }}>
            <Container>
                <Navbar.Brand id="nav-brand" style={styles.navBrand}>
                    <p>
                        <a href="https://www.interactive.net.pl" target="_blank" style={{textDecoration: 'none'}}>Logo</a>
                        <a href="/">Project</a>
                    </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavItem id="nav-item" style={styles.navItemNormal}><a href="/">Home</a></NavItem>
                        <NavItem id="nav-item" style={styles.navItemNormal}><a href="object">List of Objects</a></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MenuNavbar;