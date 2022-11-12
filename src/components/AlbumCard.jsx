import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Album extends Component {
  render() {
    const { img, artistName, albumName, releaseDate, albumId } = this.props;
    return (
      <div>
        <img src={ img } alt="album cover" />
        <p>{albumName}</p>
        <p>{artistName}</p>
        <p>{releaseDate}</p>
        <Link
          data-testid={ `link-to-album-${albumId}` }
          to={ `/album/${albumId}` }
        >
          Ver albúm

        </Link>
      </div>
    );
  }
}

Album.propTypes = {
  img: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
};
