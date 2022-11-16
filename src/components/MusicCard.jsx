import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  componentDidMount() {
    const { trackId, favoriteSongs } = this.props;
    if (favoriteSongs.includes(trackId)) {
      this.setState({ favorite: true, loading: false });
    }
  }

  addSongToFavorites = async (track) => {
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false });
  };

  onInputChange = ({ target }) => {
    const { name, checked, id } = target;

    this.setState({ [name]: checked });

    const { album } = this.props;
    const track = album.find(({ trackId }) => trackId === Number(id));
    if (checked) this.addSongToFavorites(track);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
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
            name="favorite"
            onChange={ this.onInputChange }
            checked={ favorite }
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
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
