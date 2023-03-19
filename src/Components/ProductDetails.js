import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container2">
      <div className="container1">
        <h2>{product.title}</h2>
        <img src={product.image} alt="product image" />
        <p>{product.description}</p>
        <p className="price">{product.price}$</p>
        <Link to={`/`}>
          <button className="view-button1">Back</button>
        </Link>
        <Link to={`/shoppingcart/${product.id}`}>
          <button className="add-button1">
            Add to cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
