import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faStar } from '@fortawesome/free-regular-svg-icons';
import { getUser } from '../services/userAPI';
import Logo from '../img/logo.png';
import ProfilePicture from '../img/profile-picture.png';
import '../pages/Search.css';
import '../pages/Loading2.css';
import './Header.css';

export default class Header extends Component {
  state = {
    user: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  createHeader = (user) => (
    <div className="header">
      <div className="logo-container">
        <img src={ Logo } alt="logo" className="logo" />
      </div>
      <div className="links-container links">
        <div className="search-icon-container menu-container">
          <FontAwesomeIcon icon={ faMagnifyingGlass } className="search-icon" />
          <Link
            to="/search"
            data-testid="link-to-search"
            className="side-links"
          >
            <p>Search</p>
          </Link>
        </div>
        <div className="favoite-container menu-container">
          <FontAwesomeIcon icon={ faStar } className="star-icon" />
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="side-links"
          >
            <p>Favorites</p>
          </Link>
        </div>
        <div className="profile-icon-container menu-container">
          <FontAwesomeIcon icon={ faCircleUser } className="profile-icon" />
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="side-links"
          >
            <p>Profile</p>
          </Link>
        </div>
      </div>
      <div
        data-testid="header-user-name"
      >
        {!user ? (
          <div className="skeleton">
            <p
              className="user-name"
              style={ { opcacity: 0 } }
            >
              _________________
            </p>
          </div>
        ) : (<div className="profile-section">
          <img src={ ProfilePicture } alt="profile" className="profile-picture" />
          <p className="user-name">{`Welcome, ${user.name}!`}</p>
        </div>)}
      </div>
    </div>
  );

  render() {
    const { user } = this.state;
    return (
      <div data-testid="header-component" className="header-wrapper">
        { this.createHeader(user)}
      </div>
    );
  }
}
