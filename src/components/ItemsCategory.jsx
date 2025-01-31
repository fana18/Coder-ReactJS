// src/components/ItemsCategory.jsx
import { db } from "../config/firebase";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import "../styles/card.css";

const ItemsCategory = () => {
    const { productocategoria } = useParams();
    const itemsCollectionReference = collection(db, "productos");
    const [itemListContain, setItemListContain] = useState([]);

    const getItemsList = async () => {
        try {
            const data = await getDocs(itemsCollectionReference);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            const filteredItems = filterData.filter(item => item.categoria === productocategoria);
            console.log("Productos filtrados por categoría:", filteredItems); 
            setItemListContain(filteredItems);
        } catch (error) {
            console.error("Error fetching items: ", error);
        }
    };

    useEffect(() => {
        getItemsList();
    }, [productocategoria]); 

    return (
        <div className="container">
            <div className="row">
                {itemListContain.length > 0 ? (
                    itemListContain.map((item) => (
                        <div className="col-md-3 mb-4" key={item.id}> 
                            <article className="card">
                                <img src={item.imagen} className="card-img-top" alt={item.nombre} />
                                <div className="card-body">
                                    <h6 className="card-title">{item.nombre}</h6>
                                    <p className="card-text"><b>${item.precio}</b></p>
                                    <Link className ="btn btn-info"to={`/productos/${productocategoria}/${item.id}`}>Ver Detalle</Link>
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

export default ItemsCategory;