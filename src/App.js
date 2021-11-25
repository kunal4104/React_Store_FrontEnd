import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './bootstrap/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardAdmin from './components/BoardAdmin';
import Cart from './components/Cart';
import { CartContext } from './components/CartContext';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [cart] = useContext(CartContext);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.role === 'moderator');
      setShowAdminBoard(user.user.role === 'admin');
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Furniture local
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to="/mod" className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            {!showAdminBoard && (
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart {cart.length}
                </Link>
              </li>
            )}
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={ProductDetail} />
        </Switch>
        {/* <Route path="/mod" component={BoardModerator} /> */}
        <Route path="/admin" component={BoardAdmin} />
      </div>
    </div>
  );
};

export default App;
