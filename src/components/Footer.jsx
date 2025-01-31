import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto border-top py-3 bg-light">
            <nav className="d-flex justify-content-center mb-3">
                <ul className="nav">
                    <li className="nav-item"><Link to="/" className="nav-link text-muted">Home</Link></li>
                    <li className="nav-item"><Link to="/productos" className="nav-link text-muted">Productos</Link></li>
                    <li className="nav-item"><Link to="/productos/monitores" className="nav-link text-muted">Monitores</Link></li>
                    <li className="nav-item"><Link to="/productos/mouses" className="nav-link text-muted">Mouses</Link></li>
                    <li className="nav-item"><Link to="/productos/teclados" className="nav-link text-muted">Teclados</Link></li>
                    
                </ul>
            </nav>
            <div className="text-center text-muted">
                © 2024 Company, Inc
            </div>
        </footer>
    );
};

export default Footer;