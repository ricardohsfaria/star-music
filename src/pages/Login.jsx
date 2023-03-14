import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import Form from './Form';
import { createUser } from '../services/userAPI';
import BackgroundVideo from '../img/background-video.mp4';
import './Login.css';

const MIN_NAME_LENGTH = 3;

export default class Login extends Component {
  state = {
    loginName: '',
    isButtonDisabled: true,
    isLoading: false,
    search: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    let isButtonDisabled = true;
    const lengthValidation = value.length >= MIN_NAME_LENGTH;
    if (lengthValidation) isButtonDisabled = false;
    this.setState({
      [name]: value,
      isButtonDisabled,
    });
  };

  createUserAndRedirect = async () => {
    const { loginName } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    createUser({ name: loginName }).then(() => {
      this.setState((prevState) => ({
        ...prevState,
        search: true,
      }));
    });
  };

  render() {
    const {
      loginName,
      isButtonDisabled,
      isLoading,
      search,
    } = this.state;
    return (
      <div className="showcase">
        <video className="video" src={ BackgroundVideo } muted loop autoPlay />
        { isLoading ? <Loading /> : <Form
          LoginName={ loginName }
          isButtonDisabled={ isButtonDisabled }
          onInputChange={ this.onInputChange }
          createUserAndRedirect={ this.createUserAndRedirect }
        />}
        {search ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}
