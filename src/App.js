import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemDetail from "./components/ItemDetail"; 
import ItemDetailContainer from "./components/ItemDetailContainer"; 
import ItemsCategory from "./components/ItemsCategory";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="productos" element={<ItemDetailContainer />} />
                        <Route path="productos/:productocategoria" element={<ItemsCategory />} />
                        <Route path="productos/:productocategoria/:productoid" element={<ItemDetail />} />
                        <Route path="carrito" element={<Checkout />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;