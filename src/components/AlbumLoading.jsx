import React, { Component } from 'react';
import './AlbumLoading.css';

export default class AlbumLoading extends Component {
  render() {
    return (
      <div className="skeleton-album-container">
        <div className="skeleton album-box" />
        <div className="skeleton-details">
          <h3 className="skeleton skeleton-text-h3">________</h3>
          <h4 className="skeleton skeleton-text-h4">______________</h4>
        </div>
      </div>
    );
  }
}
