import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const {
      loginName,
      isButtonDisabled,
      onInputChange,
      createUserAndRedirect,
    } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form action="">
          <label htmlFor="loginName">
            <input
              type="text"
              id="loginName"
              name="loginName"
              value={ loginName }
              data-testid="login-name-input"
              onChange={ onInputChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ createUserAndRedirect }
          >
            Entrar

          </button>
        </form>

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
