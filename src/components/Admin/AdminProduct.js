/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/admin.service';

const AdminProduct = (props) => {
  const { product } = props;

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="single-product" id={product._id}>
        <div
          className="part-1"
          style={{
            background: `url("http://localhost:3000/img/product/${product.photo}") no-repeat center`,
            backgroundSize: 'contain',
          }}
        >
          <ul>
            <li>
              <a
                onClick={() => {
                  if (
                    window.confirm('Are you sure you wish to delete this item?')
                  ) {
                    adminService.deleteProduct(product._id);
                    window.location.reload();
                  }
                }}
                type="button"
                aria-hidden="true"
              >
                {/* <i className="fas fa-shopping-cart" /> */}
                <i className="fas fa-trash-alt" />
              </a>
            </li>
            <li>
              {/* <i className="fas fa-expand" /> */}
              <Link to={`/edit/product/${product._id}`}>
                <i className="fas fa-edit" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="part-2">
          <h3 className="product-title">{product.title}</h3>
          <h4 className="product-price">
            &#36;{product.price / parseFloat(100)}
          </h4>
        </div>
      </div>
    </div>
  );
};

// AdminProduct.propTypes = {
//   product: PropTypes.objectOf(PropTypes.object).isRequired,
//   photo: PropTypes.string,
// };

export default AdminProduct;
