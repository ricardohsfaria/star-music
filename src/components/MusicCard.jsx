import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends Component {
  state = {
    loading: true,
    favorite: false,
  };

  componentDidMount() {
    const { trackId, favoriteSongs } = this.props;
    if (favoriteSongs.includes(trackId)) {
      setTimeout(() => {
        this.setState({ favorite: true, loading: false });
      }, 0);
    }
  }

  addSongToFavorites = async (track, checked) => {
    this.setState({ loading: true });
    checked = true;
    await addSong(track, checked);
    this.setState({ loading: false });
  };

  onInputChange = ({ target }) => {
    const { checkedSong } = this.props;
    const { name, checked, id } = target;

    // if (checkedSong) this.setState({ [name]: checkedSong });

    this.setState({ [name]: checked });

    const { album } = this.props;
    const track = album.find(({ trackId }) => trackId === Number(id));
    if (checked) this.addSongToFavorites(track, checked);
    if (!checked) removeSong(track);
  };

  render() {
    const { trackName, previewUrl, trackId, checkedSong } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div className="card-container">
        {/* {loading && <SongsLoading /> } */}
        <div className="song-name-container">
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
            {/* <FontAwesomeIcon icon={ faHeart } className="search-input-icon" /> */}
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              name="favorite"
              onChange={ this.onInputChange }
              checked={ checkedSong }
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
  album: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
