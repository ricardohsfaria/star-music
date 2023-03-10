import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Search.css';
import './Album.css';
import AlbumLoading from '../components/AlbumLoading';
import SongsLoading from '../components/SongsLoading';

const LOADING_TIME = 3000;

export default class Album extends Component {
  state = {
    album: [],
    info: [],
    isLoading: true,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    const albumDetails = await getMusics(id);
    const info = albumDetails[0];

    const data = await getFavoriteSongs();
    const favoriteSongs = data.map((song) => song.trackId);
    setTimeout(() => {
      this.setState({ album: albumDetails.slice(1),
        info,
        favoriteSongs,
        isLoading: false,
      });
    }, LOADING_TIME);
  }

  // adsToFavorite = async () => {
  //   this.setState({ isLoading: true });
  //   const restaureSongs = await getFavoriteSongs(restauredSongs);
  //   this.setState({ isLoading: false, restauredSongs: restaureSongs });
  //   console.log(restaureSongs);
  // };

  render() {
    const {
      info: { artistName, collectionName },
      album, isLoading, favoriteSongs } = this.state;
    return (
      <div className="album-container">
        <Header />
        <div className="upper-bar" />
        <section className="album-details">
          <h3>{ isLoading && <AlbumLoading />}</h3>
          <div data-testid="page-album" className="album-details_cover">
            {album.length > 0 && (
              <div>
                <img
                  src={ album[0].artworkUrl100 }
                  alt="album cover"
                  className="album-cover"
                />
              </div>
            )}
            <div className="album-details_info">
              <h3 data-testid="artist-name">{artistName}</h3>
              <h4 data-testid="album-name" className="album-name">{collectionName}</h4>
            </div>
          </div>
        </section>
        <section className="songs-container">
          {isLoading && <SongsLoading />}
          {album.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              album={ album }
              favoriteSongs={ favoriteSongs }
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
