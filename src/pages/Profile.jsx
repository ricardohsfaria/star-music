import React, { Component } from 'react';
import Header from '../components/Header';
import './Profile.css';
import ProfilePicture from '../img/profile-picture.png';

export default class Profile extends Component {
  render() {
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        <div className="upper-bar" />
        <div>
          <div className="profile-container">
            <img className="profile-image" src={ ProfilePicture } alt="profile" />
          </div>
          <div className="info-container">
            <div>
              <h3>Name</h3>
              <p>Your name</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>youremail@email.com</p>
            </div>
            <div>
              <h3>Description</h3>
              <div className="desciption-container">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Illo praesentium ipsa sed iusto odit mollitia dolores
                asperiores facilis minima. Sed aliquam, laudantium blanditiis
                facilis totam quam error ipsum ratione
                autem explicabo, beatae quod dolor. Dolores adipisci consectetur nisi,
                nihil libero, eligendi et quisquam officiis tempora fugit labore
                reprehenderit iste sequi!
              </div>
            </div>
          </div>
          {/* <form className="form-container" action="submit">
            <label htmlFor="name">
              Name
              <input
                className="profile-input"
                type="text"
                id="name"
                name="name"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                className="profile-input"
                type="email"
                name="email"
                id="email"
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                className="description-input"
                type="text"
                name="description"
                id="description"
              />
            </label>
            <button className="edit-profile-button" type="button">EDIT PROFILE</button>
          </form> */}
        </div>
      </div>
    );
  }
}
