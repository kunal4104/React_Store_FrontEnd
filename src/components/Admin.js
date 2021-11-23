/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
//import { Button } from 'react-bootstrap';
import Product from './ProductAdmin';
import ProductStyle from './ProductStyle';
import UserService from '../services/user.service';

const Admin = () => {
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

  // function addProduct(){
  //   // console.log('hi');
  //   // // alert('hi');
  // }

  // function addProduct(){
  //   console.alert('hi');
  // }
  return (
    <section className="section-products">
      <ProductStyle />
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3>Featured Product</h3>
              <h2>Popular Products</h2>
              {/* <Button onClick={() => addProduct()}>Add items</Button> */}
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
export default Admin;
