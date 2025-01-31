import React, { useState, useEffect } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useCart } from '../context/CartContext'; 
import { Link } from "react-router-dom"; 
import Swal from 'sweetalert2'; 

const Brief = () => {
    const [orders, setOrders] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [email, setEmail] = useState(""); 
    const [confirmEmail, setConfirmEmail] = useState(""); 
    const { clearCart } = useCart(); 

    const getOrders = async () => {
        try {
            const data = await getDocs(collection(db, "ordenes"));
            const ordersData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleFinalizePurchase = async () => {
        if (orders.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No puedes comprar ya que no añadiste ningún producto al carrito.",
                timer: 3000, 
                showConfirmButton: false,
                position: 'center' 
            });
            return;
        }

        if (email !== confirmEmail) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Los dos emails no coinciden.",
                position: 'center' 
            });
            return;
        }

        
        const lastOrderId = orders.length > 0 ? orders[orders.length - 1].id : "N/A";
        
        
        Swal.fire({
            position: "center", 
            icon: "success",
            title: "Compra finalizada",
            showConfirmButton: false,
            timer: 3000 
        }).then(async () => {
            
            Swal.fire({
                title: `El ID de su compra es el siguiente: ${lastOrderId}`,
                position: 'center' // Centrar la alerta
            });

            
            for (const order of orders) {
                
                const productRef = doc(db, "productos", order.productoId); 
                const productDoc = await getDocs(collection(db, "productos"));
                const productData = productDoc.docs.find(doc => doc.id === order.productoId);
                const currentStock = productData.data().stock; 

                
                await updateDoc(productRef, {
                    stock: currentStock - order.cantidad 
                });
            }

            
            const ordersCollection = collection(db, "ordenes");
            const ordersSnapshot = await getDocs(ordersCollection);
            ordersSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref); 
            });

            
            setOrders([]);
            clearCart(); 
            setShowModal(false); 
        });
    };

   
    const totalGeneral = orders.reduce((acc, order) => acc + (order.precio * order.cantidad), 0);

    return (
        <div>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th> 
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.nombre}</td>
                            <td>${order.precio}</td>
                            <td>x{order .cantidad}</td>
                            <td>${(order.precio * order.cantidad).toFixed(2)}</td> 
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'right' }}><strong>Total General:</strong></td>
                        <td>${totalGeneral.toFixed(2)}</td> 
                    </tr>
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Finalizar compra</button>
                        </td>
                    </tr>
                </tfoot>
            </table>

            
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Finalizar Compra</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="confirmEmail">Confirmar Email:</label>
                                <input
                                    type="email"
                                    id="confirmEmail"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={handleFinalizePurchase}>Finalizar compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            
            <div className="text-center mt-3">
                <Link to="/" className="btn btn-secondary">Volver al inicio</Link>
            </div>
        </div>
    );
}

export default Brief;