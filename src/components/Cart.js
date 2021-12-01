import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import CartItem from './CartItem';

export default function Cart() {
  const [cart] = useContext(CartContext);

  let cartTotal = 0;
  for (let i = 0; i < cart.length; i += 1) {
    cartTotal += cart[i].total;
  }

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-8 cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className="col align-self-center text-right text-muted">
                {cart.length} items
              </div>
            </div>
          </div>
          {cart.length === 0 && <div> Cart is Empty</div>}
          {cart.map((item) => (
            <CartItem key={item._id} Product={item} />
          ))}
          <div className="back-to-shop">
            <Link to="/home">
              <i className="fas fa-arrow-left" />
            </Link>
            <span className="text-muted"> Back to shop</span>
          </div>
        </div>
        <div className="col-md-4 summary">
          {cart.length > 0 && (
            <>
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div className="row">
                <div className="col" style={{ paddingLeft: '0' }}>
                  ITEMS {cart.length}
                </div>
                <div className="col text-right">
                  &#36;{cartTotal.toFixed(2)}
                </div>
              </div>
              <form>
                <p>SHIPPING</p>
                <select>
                  <option className="text-muted">
                    Standard-Delivery- &#36;5.00
                  </option>
                </select>
                <p>GIVE CODE</p>{' '}
                <input id="code" placeholder="Enter your code" />
              </form>
              <div
                className="row"
                style={{
                  borderTop: '1px solid rgba(0,0,0,.1)',
                  padding: '2vh 0',
                }}
              >
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">
                  &#36;{(cartTotal + (cart.length > 0 ? 5 : 0)).toFixed(2)}
                </div>
              </div>
              <Link to="/checkout">
                <button type="button" className="btn">
                  CHECKOUT
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
