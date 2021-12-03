/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Product from './Product';
import ProductStyle from './ProductStyle';

import UserService from '../services/user.service';

const Home = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All');

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

  const loadPage = (newPage, currentFilter) => {
    if (newPage > 0) {
      UserService.getPublicContent(newPage, currentFilter).then(
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

  const handleFilter = (event) => {
    const { target } = event;
    setFilter(target.name);
    setPage(1);
    // loadPage(page, filter);
    UserService.getPublicContent(page, target.name).then(
      (response) => {
        // eslint-disable-next-line no-undef
        const element = document.getElementById('next');
        element.classList.remove('disabled');
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
  };

  const closeModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  };

  return (
    <section className="section-products">
      <ProductStyle />
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              {/* <Form>
                <Form.Group className="mb-3" controlId="search">
                  <Form.Label>Search</Form.Label>
                  <Form.Control type="search" placeholder="Search" />
                  <Button onClick={(event) => handleSearch(event)}>
                    Search
                  </Button>
                </Form.Group>
              </Form> */}
              <h3>Featured Product</h3>
              <h2>Popular Products</h2>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="All"
                    onClick={(event) => handleFilter(event)}
                  >
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Bedroom"
                    onClick={(event) => handleFilter(event)}
                  >
                    Bedroom
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Living"
                    onClick={(event) => handleFilter(event)}
                  >
                    Living
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Kitchen"
                    onClick={(event) => handleFilter(event)}
                  >
                    Kitchen
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Study"
                    onClick={(event) => handleFilter(event)}
                  >
                    Study
                  </Dropdown.Item>
                  {/* <Dropdown.Item onClick={(event) => resetProducts(event)}>
                    All
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="row">
          {content.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <div id="myModal" className="modal">
          <span className="close" onClick={closeModal} aria-hidden="true">
            &times;
          </span>
          <img className="modal-content" id="img01" alt="" />
          <div id="caption" />
        </div>
      </div>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${page >= 2 ? '' : 'disabled'}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => {
                loadPage(page - 1, filter);
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
                loadPage(page + 1, filter);
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
