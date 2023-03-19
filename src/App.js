import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import ProductDetails from "./Components/ProductDetails";
import ProductCatalog from "./Components/Products";
import ShoppingCart from "./Components/ShoppingCart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/shoppingcart/:id" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
