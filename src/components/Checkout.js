import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CartContext } from './CartContext';

// import CartItem from './CartItem';

export default function Checkout() {
  const [cart] = useContext(CartContext);
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const selectCountry = (val) => {
    setCountry(val);
  };

  const selectRegion = (val) => {
    setRegion(val);
  };

  let cartTotal = 0;
  for (let i = 0; i < cart.length; i += 1) {
    cartTotal += cart[i].total;
  }

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
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form ">
                      <label htmlFor="firstName" className="">
                        First Name
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          placeholder="First Name"
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
                          className="form-control"
                          placeholder="Last Name"
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
                      className="form-control"
                      placeholder="Address"
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
                  >
                    Continue to checkout
                  </button>
                ) : (
                  <></>
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
