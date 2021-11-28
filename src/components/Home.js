/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import Product from './Product';
import ProductStyle from './ProductStyle';

import UserService from '../services/user.service';

const Home = () => {
  const [content, setContent] = useState([]);
  const [globalContent, setGlobalContent] = useState([]);
  // const [categoricalData, setCategoricalData] = useState(content);
  // const [filteredData, setFilteredData] = useState(categoricalData);
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
        setGlobalContent(response.data.data.data)
        // console.log(response.data.data.data);
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
    const value = event.target.value.toLowerCase();
    let result = [];

    result = content.filter((data) => data.title.search(value) !== -1);
    setContent(result);
    console.log(result);
  };

  const handleBedroomCategory = () => {
    resetProducts();
    let result = [];

    result = content.filter((data) => data.category.search("Bedroom") !== -1);
    setContent(result);
    console.log(result)
  }

  const handleStudyCategory = () => {
    resetProducts();
    let result = [];
    result = content.filter((data) => data.category.search("study") !== -1);
    setContent(result);
    console.log(result)
  }

  const handleLivingCategory = () => {
    resetProducts();
    let result = [];
    result = content.filter((data) => data.category.search("Living") !== -1);
    setContent(result);
    console.log(result)
  }

  const handleKitchenCategory = () => {
    resetProducts();
    let result = [];
    result = content.filter((data) => data.category.search("kitchen") !== -1);
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
              <Form>
                <Form.Group className="mb-3" controlId="search">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                  />
                  <Button onClick={(event) => handleSearch(event)}>Search</Button>
                </Form.Group>
              </Form>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={(event) => handleBedroomCategory(event)}>Bedroom</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => handleLivingCategory(event)}>Living</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => handleKitchenCategory(event)}>Kitchen</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => handleStudyCategory(event)}>Study</Dropdown.Item>
                  <Dropdown.Item onClick={(event) => resetProducts(event)}>All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
