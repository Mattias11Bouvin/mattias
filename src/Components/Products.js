import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((cartItems) => [...cartItems, product]);
  };

  const fetchProductById = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = () => {
    fetch(`https://fakestoreapi.com/products?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.title}</h3>
              <img src={product.image} alt="product image"></img>
              <p>{product.description.slice(0, 50)}..</p>
              <p>{product.price}$</p>
              <Link to={`/productdetails/${product.id}`}>
                <button className="view-button">View Details</button>
              </Link>
              <Link to={`/shoppingcart/${product.id}`}>
                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </div>
  );
}

export default ProductCatalog;
