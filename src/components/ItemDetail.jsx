import { db } from "../config/firebase";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext'; 
import Swal from 'sweetalert2'; 
import "../styles/detail.css"; 

const ItemDetail = () => {
    const { productoid, productocategoria } = useParams(); 
    const itemsCollectionReference = collection(db, "productos");
    const [product, setProduct] = useState(null); 
    const { addToCart, removeFromCart, getCartCount } = useCart(); 
    const [quantity, setQuantity] = useState(1); 
    const [showModal, setShowModal] = useState(false); 

    const getProduct = async () => {
        try {
            const data = await getDocs(itemsCollectionReference);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            const foundProduct = filterData.find((producto) => producto.id === productoid);
            setProduct(foundProduct);
            console.log("Producto encontrado:", foundProduct); 
        } catch (error) {
            console.error("Error fetching item: ", error);
        }
    };

    useEffect(() => {
        getProduct();
    }, [productoid]); 

    if (!product) return <p>Cargando producto...</p>; 

    const { imagen, nombre, categoria, descripcion, precio, stock } = product;

    const handleAddToCart = () => {
        setShowModal(true); 
    };

    const handleSave = async () => {
        // Validar stock
        if (stock <= 0 || isNaN(stock)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se puede comprar este producto, ya no hay stock.",
                timer: 2000,
                timerProgressBar: true,
              });
            return;
        }

        if (quantity > stock) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La cantidad seleccionada excede el stock disponible.",
                timer: 2000, // Duración en milisegundos (2000 ms = 2 segundos)
                timerProgressBar: true, // Muestra una barra de progreso
                
              }); 
            return;
        }

       
        const orderRef = doc(collection(db, "ordenes"));
        await setDoc(orderRef, {
            cantidad: quantity,
            nombre: nombre,
            precio: precio,
            productoId: productoid 
        });

        
        setShowModal(false); 
        addToCart({ ...product, quantity }); 
        console.log("Producto agregado al carrito:", product); 
    };

    const handleRemoveFromCart = async () => {
        
        removeFromCart(productoid, quantity); 

    
        const orderRef = await getDocs(collection(db, "ordenes"));
        const orderToDelete = orderRef.docs.find(doc => doc.data().nombre === nombre && doc.data().cantidad === quantity);
        
        if (orderToDelete) {
            await deleteDoc(doc(db, "ordenes", orderToDelete.id)); 
            console.log("Orden eliminada:", orderToDelete.id); 
        }

        
        console.log("Número de elementos en el carrito:", getCartCount()); 
    };

    return (
        <div className="container-fluid text-center"> 
            <div className="row justify-content-center">
                <div className="col-12 col-md-8"> 
                    <img src={imagen} className="img-fluid" alt={nombre} /> 
                    <h5 className="mt-3">{nombre}</h5>
                    <p className="lead">${precio}</p>
                    <p>Categoría: {categoria}</p>
                    <p>{descripcion}</p>
                    <p>Quedan: {stock} disponibles</p>
                    <div className="d-flex justify-content-center mt-3"> 
                        <Link to={`/productos`} className="btn btn-primary mx-2">Ver todos los productos</Link>
                        <button onClick={handleAddToCart} className="btn btn-success mx-2">Agregar al carrito</button>
                        <button onClick={handleRemoveFromCart} className="btn btn-danger mx-2">Quitar del carrito</button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Selecciona la cantidad</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="quantity">Cantidad:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    max={stock}
                                    className="form-control"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemDetail;