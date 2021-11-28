/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Product from './Product';
import ProductStyle from './ProductStyle';

import UserService from '../services/user.service';

const Home = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    UserService.getPublicContent(page).then(
      (response) => {
        setContent(response.data.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
        setPage(1);
      }
    );
  }, []);

  const loadPage = (newPage) => {
    if (newPage > 0) {
      UserService.getPublicContent(newPage).then(
        (response) => {
          // eslint-disable-next-line no-undef
          const element = document.getElementById('next');
          if (response.data.data.data.length !== 0) {
            setContent(response.data.data.data);
            element.classList.remove('disabled');
            setPage(newPage);
          } else {
            element.classList.add('disabled');
          }
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
    }
  };

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
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${page >= 2 ? '' : 'disabled'}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => {
                loadPage(page - 1);
              }}
              tabIndex="-1"
            >
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
          {/* <li className="page-item active">
            <a className="page-link" href="#">
              2 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li> */}
          <li id="next" className="page-item">
            <button
              type="button"
              onClick={() => {
                loadPage(page + 1);
              }}
              className="page-link"
              href="#"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Home;
