import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  addSongToFavorites = async (track) => {
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false });
  };

  onInputChange = ({ target }) => {
    const { name, checked } = target;
    const value = target.checked;

    this.setState({ [name]: value });

    const { album } = this.props;
    const track = album.find(({ trackId }) => trackId === Number(name));
    if (checked) this.addSongToFavorites(track);
  };

  render() {
    const { trackName, previewUrl, trackId, restauredSongs } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            name="favorita"
            onChange={ this.onInputChange }
            checked={ restauredSongs.some((song) => song.trackId === trackId) }
          />

        </label>
        <section>
          {loading && <Loading />}
        </section>
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
  restauredSongs: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
