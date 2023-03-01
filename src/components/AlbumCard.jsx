import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../pages/Search.css';
import '../pages/Loading2.css';

export default class Album extends Component {
  render() {
    const { img, artistName, albumName, albumId } = this.props;
    return (
      <div className="album">
        <Link
          data-testid={ `link-to-album-${albumId}` }
          to={ `/album/${albumId}` }
          className="album-link"
        >
          <img src={ img } alt="album cover" className="album-image" />
          <div className="album-info">
            <p className="album-name">{albumName}</p>
            <p className="artist-name">{artistName}</p>
          </div>
        </Link>
      </div>
    );
  }
}

Album.propTypes = {
  img: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
};
