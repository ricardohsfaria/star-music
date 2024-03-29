import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../img/logo.png';
import './Login.css';

const Login = styled.section`
font-size: 1.5em;
color: white;
justify-content: center;
flex-wrap: wrap;
text-align: center;
`;

const input = {
  background: 'transparent',
  border: '1px solid rgba(166, 66, 215, 1)',
  borderRadius: '15px',
  color: 'gray',
  height: '30px',
  textAlign: 'center',
  width: '300px',
};

const img = {
  marginBottom: '30px',
  height: '30%',
  width: '30%',
};

export default class Form extends Component {
  render() {
    const {
      loginName,
      isButtonDisabled,
      onInputChange,
      createUserAndRedirect,
    } = this.props;
    return (
      <div className="login-form">
        <Login>
          <img src={ Logo } alt="TrybeTunes" style={ img } />
          <form className="login-fields" action="">
            <label htmlFor="loginName">
              <input
                className="name-form-input"
                type="text"
                id="loginName"
                name="loginName"
                value={ loginName }
                data-testid="login-name-input"
                onChange={ onInputChange }
                style={ input }
                placeholder="Enter your name"
              />
            </label>
            <button
              className="login-button"
              data-testid="login-submit-button"
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ createUserAndRedirect }
            >
              Go
            </button>
          </form>
        </Login>
      </div>
    );
  }
}

Form.propTypes = {
  loginName: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  createUserAndRedirect: PropTypes.func.isRequired,
};
