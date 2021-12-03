/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CartContext } from './CartContext';
import authService from '../services/auth.service';
import checkoutService from '../services/checkout.service';

// import CartItem from './CartItem';

export default function Checkout(props) {
  const [cart] = useContext(CartContext);
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [isShowingAlert, setShowingAlert] = React.useState(false);

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    country: '',
    state: '',
    zip: '',
  });

  let cartTotal = 0;
  for (let i = 0; i < cart.length; i += 1) {
    cartTotal += cart[i].total;
  }

  const selectCountry = (val) => {
    setCountry(val);
    setAddress({ ...address, country: val });
  };

  const selectRegion = (val) => {
    setRegion(val);
    setAddress({ ...address, state: val });
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      address.firstName === '' ||
      address.lastName === '' ||
      address.street === '' ||
      address.country === '' ||
      address.state === '' ||
      address.zip === ''
    ) {
      setShowingAlert(true);
      setTimeout(() => {
        setShowingAlert(false);
      }, 300);
    } else {
      // eslint-disable-next-line no-undef
      const { user } = authService.getCurrentUser();

      console.log(...cart);
      const data = {
        user: user._id,
        total: cartTotal * 100,
        quantity: cart.length,
        items: cart,
        address: {
          firstName: address.firstName,
          lastName: address.lastName,
          street: address.street,
          pin: address.zip,
          state: address.state,
          country: address.country,
        },
      };

      console.log(data);
      console.log(props);
      return checkoutService.createOrder(data).then(
        () => {
          // eslint-disable-next-line react/destructuring-assignment
          props.history.push('/orders');
          // eslint-disable-next-line no-undef
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(resMessage);
          //   setLoading(false);
          //   setMessage(resMessage);
        }
      );
    }
  };

  const sent = [];
  for (let i = 0; i < cart.length; i += 1) {
    sent.push(cart[i]);
  }
  console.log(sent);

  const cartItem = (id, name, quantity, price) => (
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
        <h2 className="my-5 h2 text-center">Checkout</h2>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card">
              <form className="card-body">
                <div className="text-center mb-2">
                  <u>
                    <b>Shipping Address</b>
                  </u>
                </div>
                <div
                  className={`alert alert-danger ${
                    isShowingAlert ? 'alert-shown' : 'alert-hidden'
                  }`}
                  onTransitionEnd={() => setShowingAlert(false)}
                >
                  All fields are <strong>Required!</strong>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form ">
                      <label htmlFor="firstName" className="">
                        First Name
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          placeholder="First Name"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="lastName" className="">
                        Last Name
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md-form">
                  <label htmlFor="address" className="">
                    Address
                    <input
                      type="text"
                      id="address"
                      name="street"
                      className="form-control"
                      placeholder="Address"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-12 ">
                    <label htmlFor="country">
                      Country
                      <CountryDropdown
                        value={country}
                        onChange={(val) => selectCountry(val)}
                        required
                      />
                      {/* <select
                        className="custom-select d-block w-100"
                        id="country"
                        required
                      >
                        <option value="">Choose...</option>
                        <option>United States</option>
                      </select> */}
                    </label>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 ">
                    <label htmlFor="state">
                      State
                      <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => selectRegion(val)}
                        required
                      />
                      {/* <select
                        className="custom-select d-block w-100"
                        id="state"
                        required
                      >
                        <option value="">Choose...</option>
                        <option>California</option>
                      </select> */}
                    </label>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label htmlFor="zip">
                      Zip
                      <input
                        type="number"
                        name="zip"
                        className="form-control"
                        id="zip"
                        placeholder="Zip Code"
                        required
                        onChange={handleChange}
                      />
                    </label>
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>
                <hr className="mb-4" />
                {cart.length > 0 ? (
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Continue to checkout
                  </button>
                ) : (
                  <span>Cart is Empty!</span>
                )}
              </form>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="ml-10">
              <Link to="/cart">
                <i className="fas fa-arrow-left" />
              </Link>
              <span className="text-muted"> Edit Cart</span>
              <hr />
            </div>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">
                {cart.length}
              </span>
            </h4>
            <ul className="list-group mb-3 z-depth-1">
              {cart.map((el) =>
                cartItem(el._id, el.title, el.qty, (el.price / 100).toFixed(2))
              )}
              {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Product name</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Second product</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Third item</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$5</span>
              </li> */}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${cartTotal}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
