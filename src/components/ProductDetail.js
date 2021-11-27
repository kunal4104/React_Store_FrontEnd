/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserService from '../services/user.service';
// import Product from './Product';
import { CartContext } from './CartContext';
import CartServices from '../services/cart.service';
// import CartServices from '../services/cart.service';

const ProductDetail = (props) => {
  // const { Product } = props;
  const [cart, setCart] = useContext(CartContext);
  const [Product, setProduct] = useState({});
  // let cartItem = {};
  // const { id } = useParams();
  const { id } = props.match.params;
  const CartItem = () => {
    const i = cart.find((el) => el._id === Product._id);
    if (i) {
      return i;
    }
    const temp = { qty: 0 };
    return temp;
  };

  const runOnAdd = (item) => {
    CartServices.onAdd(cart, setCart, item);
  };

  const runOnRemove = (item) => {
    CartServices.onRemove(cart, setCart, item);
  };

  //   const runOnAdd = (item) => {
  //     CartServices.onAdd(cartItems, setCartItems, item);
  //   };
  useEffect(() => {
    if (id !== undefined) {
      UserService.getProduct(id).then(
        (response) => {
          const { data } = response.data.data;
          setProduct(data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setProduct(_content);
        }
      );
    }
  }, [id]);

  return (
    <section className="my-5">
      <div className="row">
        <div className="col-md-5 mb-4 mb-md-0">
          <div className="view zoom z-depth-2 rounded">
            <img
              className="img-fluid w-100"
              src={`http://localhost:3000/img/product/${Product.photo}`}
              alt="Sample"
            />
            <a href="#!">
              <div className="mask waves-effect waves-light" />
            </a>
          </div>
        </div>
        <div className="col-md-7">
          <h5>{Product.title}</h5>
          <p className="mb-2 text-muted text-uppercase small">
            {Product.category}
          </p>
          <p>
            <span className="mr-1">
              <strong>${Product.price / parseFloat(100)}</strong>
            </span>
          </p>
          <p className="pt-1">{Product.description}</p>
          <div className="table-responsive">
            <table className="table table-sm table-borderless mb-0">
              <tbody>
                <tr>
                  <th className="pl-0 w-25" scope="row">
                    <strong>Size</strong>
                  </th>
                  <td>{Product.size}</td>
                </tr>
                <tr>
                  <th className="pl-0 w-25" scope="row">
                    <strong>Material</strong>
                  </th>
                  <td>{Product.material}</td>
                </tr>
                <tr>
                  <th className="pl-0 w-25" scope="row">
                    <strong>Color</strong>
                  </th>
                  <td>{Product.color}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className="table-responsive mb-2">
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td className="pl-0 pb-0 w-25">Quantity</td>
                </tr>
                <tr>
                  <td className="pl-0">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => runOnRemove(Product)}
                      >
                        -
                      </button>
                      &nbsp;
                      <div style={{ display: 'inline' }}>
                        {CartItem().qty || 0}
                      </div>
                      &nbsp;
                      <button type="button" onClick={() => runOnAdd(Product)}>
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light"
          >
            Buy now
          </button>
          <button
            type="button"
            className="btn btn-light btn-md mr-1 mb-2 waves-effect waves-light"
          >
            <i className="fas fa-shopping-cart pr-2" />
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;

/*
<section className="my-5">
  <div className="row">
    <div className="col-md-5 mb-4 mb-md-0">
      <div className="view zoom z-depth-2 rounded">
        <img
          className="img-fluid w-100"
          src="https://mdbootstrap.com/img/Photos/Horizontal/Interior/img(10).jpg"
          alt="Sample"
        />
        <a href="#!">
          <div className="mask waves-effect waves-light" />
        </a>
      </div>
    </div>
    <div className="col-md-7">
      <h5>Set of 3 seagrass baskets</h5>
      <p className="mb-2 text-muted text-uppercase small">Storage</p>
      <ul className="rating">
        <li>
          <i className="fas fa-star fa-sm text-primary" />
        </li>
        <li>
          <i className="fas fa-star fa-sm text-primary" />
        </li>
        <li>
          <i className="fas fa-star fa-sm text-primary" />
        </li>
        <li>
          <i className="fas fa-star fa-sm text-primary" />
        </li>
        <li>
          <i className="far fa-star fa-sm text-primary" />
        </li>
      </ul>
      <p>
        <span className="mr-1">
          <strong>$79.99</strong>
        </span>
      </p>
      <p className="pt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
        sapiente illo. Sit error voluptas repellat rerum quidem, soluta enim
        perferendis voluptates laboriosam.
      </p>
      <div className="table-responsive">
        <table className="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th className="pl-0 w-25" scope="row">
                <strong>Size</strong>
              </th>
              <td>Different sizes</td>
            </tr>
            <tr>
              <th className="pl-0 w-25" scope="row">
                <strong>Material</strong>
              </th>
              <td>Seagrass</td>
            </tr>
            <tr>
              <th className="pl-0 w-25" scope="row">
                <strong>Color</strong>
              </th>
              <td>Sand</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div className="table-responsive mb-2">
        <table className="table table-sm table-borderless">
          <tbody>
            <tr>
              <td className="pl-0 pb-0 w-25">Quantity</td>
            </tr>
            <tr>
              <td className="pl-0">
                <div className="def-number-input number-input safari_only mb-0">
                  <button className="minus" />
                  <input
                    className="quantity"
                    min="0"
                    name="quantity"
                    value="1"
                    type="number"
                  />
                  <button className="plus" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light"
      >
        Buy now
      </button>
      <button
        type="button"
        className="btn btn-light btn-md mr-1 mb-2 waves-effect waves-light"
      >
        <i className="fas fa-shopping-cart pr-2" />
        Add to cart
      </button>
    </div>
  </div>
</section>;

*/
