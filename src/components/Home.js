/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Product from './Product';
import ProductStyle from './ProductStyle';

import UserService from '../services/user.service';

const Home = () => {
  const [content, setContent] = useState([]);
  //   const { onAdd } = props;
  //   const [cartItems, setCartItems] = useState([]);

  //   const onAdd = (product) => {
  //     const exist = cartItems.find((x) => x._id === product._id);
  //     console.log(product);
  //     console.log(exist);
  //     if (exist) {
  //       setCartItems(
  //         cartItems.map((x) =>
  //           x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
  //         )
  //       );
  //     } else {
  //       setCartItems([...cartItems, { ...product, qty: 1 }]);
  //     }
  //     console.log(cartItems);
  //   };

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <section className="section-products">
      <ProductStyle />
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3>Featured Product</h3>
              <h2>Popular Products</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {content.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
