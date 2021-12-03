import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import checkoutService from '../services/checkout.service';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { user } = authService.getCurrentUser();
    console.log(user);
    checkoutService.getUserOrders(user._id).then(
      (response) => {
        console.log(response);
        setOrders(response.data.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setOrders(_content);
      }
    );
  }, []);

  console.log(orders);

  return (
    <div className="row">
      <div className="col">
        {orders.map((order) => (
          <div key={order._id} className="card m-3">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <span>ORDER PLACED</span>
                    {/* <span>2nd December 2021</span> */}
                    <span>{new Date(order.createdAt).toDateString()}</span>
                  </div>
                  <div className="d-flex flex-column ml-5">
                    <span>TOTAL</span>
                    <span>${(order.total / 100).toFixed(2)}</span>
                  </div>
                  <div className="d-flex flex-column ml-5">
                    <span>SHIP TO</span>
                    <span className="" data-toggle="tooltip">
                      {`${order.address.firstName} ${order.address.lastName}`}
                    </span>
                    <span className="tooltip">
                      {`${order.address.street},
                        ${order.address.state},
                        ${order.address.country},
                        ${order.address.pin}
                        `}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="d-flex flex-column ml-5">
                    <span>ORDER #{order._id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {order.items.map((el) => (
                <div key={el._id} className="d-flex flex-row m-2">
                  <img
                    style={{
                      width: '8em',
                      height: 'auto',
                      borderRadius: '5px',
                    }}
                    className=""
                    src={`http://localhost:3000/img/product/${el.photo}`}
                    alt={el.title}
                  />
                  <div className="ml-3">
                    <h4 className="">
                      <Link to={`/product/${el._id}`}>{el.title}</Link>
                    </h4>
                    <p className="">Quantity: {el.qty}</p>
                    <p className="">Price: ${(el.price / 100).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
