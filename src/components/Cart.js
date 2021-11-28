/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
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
          {/* <div class="row">
                            <div class="row main align-items-center">
                                <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg"></></div>
                                <div class="col">
                                    <div class="row text-muted">Shirt</div>
                                    <div class="row">Cotton T-shirt</div>
                                </div>
                                <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                                <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                            </div>
                        </div> */}
          {/* <div class="row border-top border-bottom">
                            <div class="row main align-items-center">
                                <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg"></></div>
                                <div class="col">
                                    <div class="row text-muted">Shirt</div>
                                    <div class="row">Cotton T-shirt</div>
                                </div>
                                <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                                <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                            </div>
                        </div> */}
          <div className="back-to-shop">
            <Link to="/home">
              <i className="fas fa-arrow-left" />
            </Link>
            <span className="text-muted"> Back to shop</span>
          </div>
        </div>
        <div className="col-md-4 summary">
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
            <div className="col text-right">&#36;{cartTotal.toFixed(2)}</div>
          </div>
          <form>
            <p>SHIPPING</p>
            <select>
              <option className="text-muted">
                Standard-Delivery- &#36;5.00
              </option>
            </select>
            <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
          </form>
          <div
            className="row"
            style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}
          >
            <div className="col">TOTAL PRICE</div>
            <div className="col text-right">
              &#36;{(cartTotal + (cart.length > 0 ? 5 : 0)).toFixed(2)}
            </div>
          </div>
          <button type="button" className="btn">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
