/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import orderService from '../../services/order.service';

const OrderDetail = (props) => {
  const [order, setOrder] = useState({ address: {}, items: [] });
  const [status, setStatus] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    const { id } = props.match.params;
    orderService.getSingleOrder(id).then(
      (response) => {
        const { data } = response.data.data;
        setOrder(data);
        setCurrentStatus(data.status);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setOrder(_content);
      }
    );
  }, []);

  const handleUpdateStatus = () => {
    orderService.updateOrderStatus(status, order._id).then(
      (response) => {
        setCurrentStatus(status);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setCurrentStatus(_content);
      }
    );
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const orderItem = (id, name, quantity, price) => (
    <li
      key={id}
      className="list-group-item d-flex justify-content-between lh-condensed"
    >
      <div>
        <h6 className="my-0">{name}</h6>
        <small className="text-muted">quantity: {quantity}</small>
      </div>
      <span className="text-muted">${price}</span>
    </li>
  );

  return (
    <main className="mt-5 pt-4">
      <div className="container wow fadeIn">
        <h2 className="my-5 h2 text-center">Order Detail</h2>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card">
              <form className="card-body">
                <div className="text-center mb-2">
                  <u>
                    <b>Shipping Address</b>
                  </u>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form ">
                      <label htmlFor="firstName" className="">
                        First Name
                        <p>{order.address.firstName}</p>
                      </label>
                    </div>{' '}
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="lastName" className="">
                        Last Name
                        <p>{order.address.lastName}</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md-form ml-3">
                  <label htmlFor="address" className="">
                    Address
                    <p>{order.address.street}</p>
                  </label>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-12 ">
                    <label htmlFor="country">
                      Country
                      <p>{order.address.country}</p>
                    </label>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 ">
                    <label htmlFor="state">
                      State
                      <p>{order.address.state}</p>
                    </label>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label htmlFor="zip">
                      Zip
                      <p>{order.address.pin}</p>
                    </label>
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>
                <hr className="mb-4" />
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Status:</h5>
                    <span>{currentStatus}</span>
                  </div>
                  <div>
                    <label htmlFor="status">
                      Change Status:
                      <select name="status" onChange={handleStatusChange}>
                        <option value="Placed">Placed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateStatus}
                      >
                        Update
                      </button>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Order items</span>
              <span className="badge badge-secondary badge-pill">
                {/* {order.items.length} */}
              </span>
            </h4>
            <ul className="list-group mb-3 z-depth-1">
              {order.items.map((el) =>
                orderItem(el._id, el.title, el.qty, (el.price / 100).toFixed(2))
              )}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${(order.total / 100).toFixed(2)}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
export default OrderDetail;
