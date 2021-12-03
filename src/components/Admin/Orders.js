/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkoutService from '../../services/order.service';
// import adminService from '../../services/admin.service';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    checkoutService.getAllOrders().then(
      (response) => {
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
    <div className="col">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((el) => (
            <tr key={el._id}>
              <th scope="row">#{el._id}</th>
              <td>{`${el.address.firstName} ${el.address.lastName}`}</td>
              <td>{el.status}</td>
              <td>${(el.total / 100).toFixed(2)}</td>
              <td>
                <Link to={`/admin/order/${el._id}`}>order details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// AdminProduct.propTypes = {
//   product: PropTypes.objectOf(PropTypes.object).isRequired,
//   photo: PropTypes.string,
// };

export default Orders;
