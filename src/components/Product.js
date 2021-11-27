/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import CartServices from '../services/cart.service';

const Product = (props) => {
  const { product } = props;

  const [cartItems, setCartItems] = useContext(CartContext);

  const runOnAdd = (item) => {
    CartServices.onAdd(cartItems, setCartItems, item);
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="single-product" id={product.id}>
        <div
          className="part-1"
          style={{
            background: `url("http://localhost:3000/img/product/${product.photo}") no-repeat center`,
            backgroundSize: 'cover',
          }}
        >
          <ul>
            <li>
              <a type="button" onClick={() => runOnAdd(product)}>
                <i className="fas fa-shopping-cart" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-expand" />
              </a>
            </li>
          </ul>
        </div>
        <div className="part-2">
          <h3 className="product-title">
            <Link to={`/product/${product._id}`}> {product.title} </Link>
          </h3>
          <h4 className="product-old-price">$79.99</h4>
          <h4 className="product-price">
            &#36;{product.price / parseFloat(100)}
          </h4>
        </div>
      </div>
    </div>
  );
};
export default Product;
