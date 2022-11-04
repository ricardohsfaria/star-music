import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    user: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  createHeader = (user) => (
    <div className="header_container">
      <div data-testid="header-user-name">{ user.name }</div>
      <Link to="/search" data-testid="link-to-search">Search</Link>
      <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
      <Link to="/profile" data-testid="link-to-profile">Profile</Link>
    </div>
  );

  render() {
    const { user } = this.state;
    return (
      <div data-testid="header-component">
        { !user ? <Loading /> : this.createHeader(user)}
      </div>
    );
  }
}
