import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [formvalid, setFormValid] = useState(true);


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);


  const handleNameChange = (event) => {
    setName(event.target.value);

  };

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handleAddressChange = (event) => {
  setAdress(event.target.value);
};

const handleCardNumberChange = (event) => {
  setCardNumber(event.target.value);
};


  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !adress || !cardNumber) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };
  

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <Link to={`/`}>
          <button className="back-button">Back to Shopping</button>
        </Link>
      </div>
      {product && (
      <div className="checkout-product">
        <img src={product.image} alt="product image" />
        <div className="product-details">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="price">{product.price}$</p>
        </div>
      </div>
      )}
      <div className="checkout-form">
        <h2>Order Summary</h2>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required />
        {!name && !formvalid && <span className="error">Please enter your name</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
        {!email && !formvalid && <span className="error">Please enter your email</span>}
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={adress} onChange={handleAddressChange} required />
        {!adress && !formvalid && <span className="error">Please enter your address</span>}
      </div>
      <div className="form-group">
        <label htmlFor="card-number">Card Number:</label>
        <input type="text" id="card-number" name="card-number" value={cardNumber} onChange={handleCardNumberChange} required />
        {!cardNumber && !formvalid && <span className="error">Please enter your card number</span>}
      </div>
      
      <button className="checkout-button" type="submit">
        Pay
      </button>
    </form>
    
    </div>
    </div>
  );
}


export default ShoppingCart;


