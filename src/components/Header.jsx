import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faStar } from '@fortawesome/free-regular-svg-icons';
import { getUser } from '../services/userAPI';
import Logo from '../img/logo.png';
// import Loading from '../pages/Loading';
import '../pages/Search.css';
import '../pages/Loading2.css';

const HeaderContainer = styled.header`
position: fixed;
align-items: center;
display: flex;
justify-content: space-between;
flex-direction: column;
flex-wrap: wrap;
height: 100vh;
`;

const Links = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default class Header extends Component {
  state = {
    user: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  createHeader = (user) => (
    <HeaderContainer>
      <ImageContainer>
        <img src={ Logo } alt="logo" className="logo" />
      </ImageContainer>
      <Links className="links">
        <div className="search-icon-container">
          <FontAwesomeIcon icon={ faMagnifyingGlass } className="search-icon" />
          <Link
            to="/search"
            data-testid="link-to-search"
            className="side-links"
          >
            Search
          </Link>
        </div>
        <div className="favoite-container">
          <FontAwesomeIcon icon={ faStar } className="star-icon" />
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="side-links"
          >
            Favorites
          </Link>
        </div>
        <div className="profile-icon-container">
          <FontAwesomeIcon icon={ faCircleUser } />
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="side-links"
          >
            Profile
          </Link>
        </div>
      </Links>
      <div
        data-testid="header-user-name"
      >
        <p className="user-name">{`Welcome, ${user.name}!`}</p>
      </div>
    </HeaderContainer>
  );

  render() {
    const { user } = this.state;
    return (
      <div data-testid="header-component" className="header">
        { user && this.createHeader(user)}
      </div>
    );
  }
}
