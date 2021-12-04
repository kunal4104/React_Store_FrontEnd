/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createRef, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import adminService from '../../services/admin.service';

const EditProduct = (props) => {
  const [Product, setProduct] = useState({});
  const { id } = props.match.params;
  const [Updated, setUpdated] = useState({});
  const fileInput = createRef();

  useEffect(() => {
    if (id !== undefined) {
      UserService.getProduct(id).then(
        (response) => {
          const { data } = response.data.data;
          data.price /= 100;
          setUpdated(data);
          setProduct(data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setProduct(_content);
          setUpdated(_content);
        }
      );
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('title', Updated.title);
    data.append('price', Updated.price * 100);
    data.append('description', Updated.description);
    data.append('category', Updated.category);
    data.append('size', Updated.size);
    data.append('material', Updated.material);
    data.append('color', Updated.color);
    if (fileInput.current.files[0]) {
      data.append('photo', fileInput.current.files[0]);
    }
    adminService.updateProduct(data, Updated._id).then(
      () => {
        // eslint-disable-next-line react/destructuring-assignment
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  //   const getPrice = (price) => price / parseFloat(100);

  const handleInputChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setUpdated({ ...Updated, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="my-5">
        <div className="row">
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="view zoom z-depth-2 rounded">
              <img
                className="img-fluid w-100"
                src={`http://localhost:3000/img/product/${Updated.photo}`}
                alt="Sample"
              />
              <a href="#!">
                <div className="mask waves-effect waves-light" />
              </a>
            </div>
          </div>
          <div className="col-md-7">
            <label htmlFor="title">
              <h5>Title</h5>
              <input
                type="text"
                name="title"
                value={Updated.title || ''}
                onChange={handleInputChange}
              />
            </label>
            <p className="mb-2 text-muted text-uppercase small">
              <label htmlFor="title">
                Category
                <input
                  type="text"
                  name="category"
                  value={Updated.category || ''}
                  onChange={handleInputChange}
                />
              </label>
            </p>
            <p>
              <span className="mr-1">
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={Updated.price || ''}
                    onChange={handleInputChange}
                  />
                </label>
              </span>
            </p>
            <p>
              <span className="mr-1">
                <label htmlFor="price">
                  Image
                  <input type="file" id="image" ref={fileInput} name="image" />
                </label>
              </span>
            </p>

            <p style={{ verticalAlign: 'middle' }} className="pt-1">
              <label htmlFor="description">
                Description <br />
                <textarea
                  style={{ width: '100%' }}
                  col={150}
                  id="description"
                  name="description"
                  value={Updated.description || ''}
                  onChange={handleInputChange}
                />
              </label>
            </p>
            <div className="table-responsive">
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="pl-0 w-25" scope="row">
                      <strong>Size</strong>
                    </th>
                    <td>
                      <input
                        id="size"
                        name="size"
                        value={Updated.size || ''}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row">
                      <strong>Material</strong>
                    </th>
                    <td>
                      <input
                        id="material"
                        name="material"
                        value={Updated.material || ''}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row">
                      <strong>Color</strong>
                    </th>
                    <td>
                      <input
                        id="color"
                        name="color"
                        value={Updated.color || ''}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <button
              type="submit"
              className="btn btn-light btn-md mr-1 mb-2 waves-effect waves-light"
            >
              <i className="fas fa-save pr-2" />
              Save
            </button>
            <Link
              to="/admin"
              className="btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light"
            >
              Cancel
            </Link>
          </div>
        </div>
      </section>
    </form>
  );
};
export default EditProduct;
