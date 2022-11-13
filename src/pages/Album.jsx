import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    album: [],
    info: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumDetails = await getMusics(id);
    const info = albumDetails[0];
    this.setState({ album: albumDetails.slice(1), info, isLoading: false });
  }

  render() {
    const { info: { artistName, collectionName }, album, isLoading } = this.state;
    return (
      <div>
        <section data-testid="page-album">
          <Header />
          <h3>{ isLoading ? 'Carregando' : ''}</h3>
          <h3 data-testid="artist-name">{artistName}</h3>
          <h4 data-testid="album-name">{collectionName}</h4>
        </section>
        <section>
          {album.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              album={ album }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
