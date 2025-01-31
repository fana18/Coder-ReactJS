
import React, { useState, useEffect } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import "../styles/card.css";

const ItemDetailContainer = () => {
    const itemsCollectionReference = collection(db, "productos");
    const [itemListContain, setItemListContain] = useState([]);

    const getItemsList = async () => {
        try {
            const data = await getDocs(itemsCollectionReference);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log("Productos obtenidos:", filterData); 
            setItemListContain(filterData);
        } catch (error) {
            console.error("Error fetching items: ", error);
        }
    };

    useEffect(() => {
        getItemsList();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {itemListContain.length > 0 ? (
                    itemListContain.map((item) => (
                        <div className="col-md-3 mb-4" key={item.id}> 
                            <article className="card">
                                <img src={item.imagen} className="card-img-top" alt={item.nombre} />
                                <div className="card-body d-flex flex-column"> 
                                    <h6 className="card-title">{item.nombre}</h6>
                                    <p className="card-text"><b>${item.precio}</b></p>
                                    <Link className='btn btn-info mt-auto' to={`/productos/${item.categoria}/${item.id}`}>Ver detalle</Link> {/* Añadir mt-auto */}
                                </div>
                            </article>
                        </div>
                    ))
                ) : (
                    <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Cargando productos...</p>
                )}
            </div>
        </div>
    );
}

export default ItemDetailContainer;