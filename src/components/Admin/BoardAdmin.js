/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminProduct from './AdminProduct';
import ProductStyle from '../ProductStyle';

import UserService from '../../services/user.service';

const BoardAdmin = () => {
  const [content, setContent] = useState([]);

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
              <h3>Admin Board</h3>
              <h2>Modify Products</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="single-product">
              <div
                className="part-1"
                style={{
                  background: `url("http://localhost:3000/img/product/default.jpg") no-repeat center`,
                  backgroundSize: 'cover',
                }}
              >
                <ul>
                  <li>&nbsp;</li>
                  <li>&nbsp;</li>
                </ul>
              </div>
              <div className="part-2">
                <h1 className="product-title">
                  <Link to="/create/product">
                    <b>Create New Products</b>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          {content.map((product) => (
            <AdminProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardAdmin;
