/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminProduct from './AdminProduct';
import ProductStyle from '../ProductStyle';

import UserService from '../../services/user.service';

const BoardAdmin = () => {
  const [content, setContent] = useState([]);
  const [globalContent, setGlobalContent] = useState([]);
  const textInput = React.createRef();

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data.data.data);
        setGlobalContent(response.data.data.data)
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

  const resetProducts = () => {
    setContent(globalContent);
  };

  const handleSearch = (event) => {
    let result = [];
    result = content.filter((data) => data.title.search(textInput.current.value) !== -1);
    setContent(result);
    console.log(result);
  };

  const handleBedroomCategory = () => {
    let result = [];
    result = globalContent.filter((data) => data.category.search("Bedroom") !== -1);
    setContent(result);
    console.log(result)
  }

  const handleStudyCategory = () => {
    let result = [];
    result = globalContent.filter((data) => data.category.search("study") !== -1);
    setContent(result);
    console.log(result)
  }

  const handleLivingCategory = () => {
    let result = [];
    result = globalContent.filter((data) => data.category.search("Living") !== -1);
    setContent(result);
    console.log(result)
  }

  const handleKitchenCategory = () => {
    let result = [];
    result = globalContent.filter((data) => data.category.search("kitchen") !== -1);
    setContent(result);
    console.log(result)
  }


  return (
    <section className="section-products">
      <ProductStyle />
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3>Admin Board</h3>
              <h2>Modify Products</h2>
              <Form>
                <Form.Group className="mb-3" controlId="search">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    ref={textInput}
                    type="search"
                    placeholder="Search"
                  />
                  <Button onClick={(event) => {
                    handleSearch(event);
                  }
                  }>Search</Button>
                </Form.Group>
              </Form>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={(event) => { handleBedroomCategory(event) }}>Bedroom</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => { handleLivingCategory(event) }}>Living</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => { handleKitchenCategory(event) }}>Kitchen</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => { handleStudyCategory(event) }}>Study</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => { resetProducts(event); }}>All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
