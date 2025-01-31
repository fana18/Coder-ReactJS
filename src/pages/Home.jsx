import React, { useEffect } from 'react';
import "../styles/home.css";
import Aos from 'aos';
import 'aos/dist/aos.css';
import genius from "../assets/genius.jpg"
import logitech from "../assets/logitech.png"
import samsung from "../assets/samsung.png"
import sonic from "../assets/sonic.png"

const Home = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 }); // Inicializa AOS con duración de animación de 1s
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="display-4 text-center mb-4">¿Quiénes somos?</h1>

            {/* Sección Historia (Aparece desde la izquierda) */}
            <section className="py-5 section-spacing" data-aos="fade-left" data-aos-delay="0">
                <div className="row align-items-center">
                    <div className="col-md-6 order-md-2 text-end">
                        <h2 className="display-5 font-weight-bold text-dark">Historia de Power Technology</h2>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <p>
                            Power Technology abrió sus puertas hace aproximadamente nueve años con el objetivo inicial de vender películas y juegos de PlayStation 2, comercializar una cantidad escasa y limitada de periféricos, y brindar servicios de flasheo, chipeo y reparación de consolas PlayStation 2 (PS2) y PlayStation 3 (PS3). Con el tiempo, amplió su catálogo y comenzó a enfocarse en periféricos y servicios técnicos de computadoras. Actualmente, ofrece servicio técnico para celulares y tabletas, además del armado de PC a medida.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección Actividad (Aparece desde la derecha con 1.5s de retraso) */}
            <section className="py-5 section-spacing bg-light" data-aos="fade-right" data-aos-delay="500">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2 className="display-5 font-weight-bold text-dark">Actividad Desarrollada</h2>
                    </div>
                    <div className="col-md-6">
                        <p>
                            Power Technology se encarga de la comercialización de periféricos y componentes, así como también brinda servicios técnicos a PCs, celulares y tabletas. Su local está ubicado en Córdoba, en AV Juan B. Justo 3208, y cuenta con una excelente exhibición de sus productos.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección Marcas (Aparece desde la izquierda con 3s de retraso) */}
            <section className="py-5 text-center section-spacing" data-aos="fade-left" data-aos-delay="700">
                <h2>Marcas</h2>
                <div className="brands-container  text-center">
                    <img src={genius} alt="marca genius" />
                    <img src={logitech} alt="marca logitech" />
                    <img src={sonic} alt="marca sonic" />
                    <img src={samsung} alt="marca samsung" />
                </div>
            </section>

        </div>
    );
};

export default Home;
