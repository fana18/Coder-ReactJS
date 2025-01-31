import React from "react";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4"> {/* Agregar mb-4 para margen inferior */}
            <div className="container-md">
                <Link className="navbar-brand" to="/">
                    PowerTechnology
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">
                                Productos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos/monitores">
                                Monitores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos/mouses">
                                Mouses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos/teclados">
                                Teclados
                            </Link>
                        </li>
                    </ul>
                </div>
                <CartWidget />
            </div>
        </nav>
    );
};

export default NavBar;