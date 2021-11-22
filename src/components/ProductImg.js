/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const ProductImg = (props) => (
  <style>
    {`
        .section-products #${props.id} .part-1::before {

            background: url("http://localhost:3000/img/product/${props.img}") no-repeat center; 
            background-size: cover;
            transition: all 0.3s;
        }
    `}
  </style>
);

// background: url('public/img/product/${props.img}') no-repeat center;
export default ProductImg;
