import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends Component {
  state = {
    loading: true,
    favorite: false,
    clicked: '',
    audioRef: null,
  };

  componentDidMount() {
    const { trackId, favoriteSongs } = this.props;
    if (favoriteSongs.includes(trackId)) {
      setTimeout(() => {
        this.setState({ favorite: true, loading: false });
      }, 0);
    }
  }

  componentDidUpdate(prevState) {
    const { location } = window;
    if (prevState.removed !== this.state.removed) {
      this.setState({ removed: false });
      location.reload(true);
    }
  }

  addSongToFavorites = async (track, checked) => {
    checked = true;
    await addSong(track, checked);
  };

  onInputChange = ({ target }) => {
    const { name, checked, id } = target;

    this.setState({ [name]: checked, clicked: checked });

    const { album } = this.props;
    const track = album.find(({ trackId }) => trackId === Number(id));
    if (checked) this.addSongToFavorites(track, checked);
    if (!checked && (global.confirm(
      'Are you sure you want to remove this song from your favorites?',
    ))) {
      removeSong(track);
      this.setState({ removed: true });
    }
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checkedSong,
      artworkUrl30,
    } = this.props;
    const { clicked, favorite, loading } = this.state;
    return (
      <div className="card-container">
        {console.log(loading)}
        <div className="song-name-container">
          <div className="img-container">
            {artworkUrl30 && <img src={ artworkUrl30 } alt="album icon" />}
          </div>
          <p>{trackName}</p>
        </div>
        <div className="audio-container">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
            className="audio"
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <div className="checkbox">
          <label htmlFor={ trackId }>
            <input
              className="favorite-input"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              name="favorite"
              onChange={ this.onInputChange }
              checked={ checkedSong || favorite }
            />
            <FontAwesomeIcon
              icon={ faHeart }
              className={ `pointer ${clicked} ${checkedSong}` }
            />
          </label>
        </div>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checkedSong: PropTypes.bool.isRequired,
  artworkUrl30: PropTypes.string.isRequired,
  album: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
