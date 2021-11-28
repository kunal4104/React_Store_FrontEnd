/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import CartServices from '../services/cart.service';

export default function cartItem(props) {
  const { Product } = props;
  const [cart, setCart] = useContext(CartContext);

  const runOnAdd = (item) => {
    CartServices.onAdd(cart, setCart, item);
  };

  const runOnRemove = (item) => {
    CartServices.onRemove(cart, setCart, item);
  };

  const runRemoveAll = (item) => {
    CartServices.removeAll(cart, setCart, item);
  };

  const productImg = `http://localhost:3000/img/product/${Product.photo}`;

  return (
    // <><div key={Product._id} className="row">
    //       <div className="col-2">{Product.title}</div>
    //       <div className="col-2">
    //           <button type="button" onClick={() => runOnAdd(Product)} className="add">
    //               +
    //           </button>
    //           <button
    //               type="button"
    //               onClick={() => runOnAdd(Product)}
    //               className="remove"
    //           >
    //               -
    //           </button>
    //       </div>
    //       <div className="col-2 text-right">
    //           {Product.qty} X ${Product.price / 100}
    //       </div>
    //   </div>
    <div className="row border-top border-bottom" key={Product._id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={productImg} alt={Product.title} />
        </div>
        <div className="col">
          {/* <div className="row text-muted">Shirt</div> */}
          <div className="row">{Product.title}</div>
        </div>
        <div className="col">
          <button type="button" onClick={() => runOnRemove(Product)}>
            -
          </button>
          &nbsp;
          <div style={{ display: 'inline' }}>{Product.qty}</div>
          &nbsp;
          <button type="button" onClick={() => runOnAdd(Product)}>
            +
          </button>
        </div>
        <div className="col">
          &#36;{Product.total.toFixed(2)}
          <span
            className="close"
            onClick={() => {
              runRemoveAll(Product);
            }}
          >
            &#10005;
          </span>
        </div>
      </div>
    </div>
  );
}
