import React, { Component } from 'react';
import './SongsLoading.css';

export default class SongsLoading extends Component {
  render() {
    return (
      <div className="all-songs">
        <div className="song-wrapper">
          <div className="text-container skeleton">
            <h3 className="skeleton-text skeleton-song-name">________</h3>
          </div>
          <div className="skeleton skeleton-audio" />
        </div>
        <div className="song-wrapper">
          <div className="text-container skeleton">
            <h3 className="skeleton-text skeleton-song-name">________</h3>
          </div>
          <div className="skeleton skeleton-audio" />
        </div>
        <div className="song-wrapper">
          <div className="text-container skeleton">
            <h3 className="skeleton-text skeleton-song-name">________</h3>
          </div>
          <div className="skeleton skeleton-audio" />
        </div>
        <div className="song-wrapper">
          <div className="text-container skeleton">
            <h3 className="skeleton-text skeleton-song-name">________</h3>
          </div>
          <div className="skeleton skeleton-audio" />
        </div>
        <div className="song-wrapper">
          <div className="text-container skeleton">
            <h3 className="skeleton-text skeleton-song-name">________</h3>
          </div>
          <div className="skeleton skeleton-audio" />
        </div>
        <div className="song-wrapper">
          <div className="text-container skeleton">
            <h3 className="skeleton-text skeleton-song-name">________</h3>
          </div>
          <div className="skeleton skeleton-audio" />
        </div>
      </div>
    );
  }
}
