import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartWidget = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0); 

    console.log("Total de items en el carrito:", totalItems); 

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Link to="/carrito"><FaShoppingCart /></Link>
            <span>{totalItems > 0 ? totalItems : ''}</span>
        </div>
    );
}

export default CartWidget;