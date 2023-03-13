import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import './Favorites.css';

export default class Favorites extends Component {
  state = {
    songs: [],
    isLoading: false,
  };

  componentDidMount() {
    const { songs } = this.state;
    this.getFavoriteSongs();

    const favoriteSongs = songs.map((song) => song.trackId);
    setTimeout(() => {
      this.setState({ songs: favoriteSongs.slice(1),
        info,
        favoriteSongs,
        isLoading: false,
      });
    }, 0);
  }

  getFavoriteSongs = () => {
    const { songs } = this.state;
    this.setState({ isLoading: true });
    const favoriteSongs = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState(...songs, { songs: favoriteSongs });
    console.log(favoriteSongs);
  };

  render() {
    const { songs, isLoading, favoriteSongs, info } = this.state;
    return (
      <div className="favorites-container">
        <Header />
        <div>
          <div className="upper-bar" />
          <div className="favorite-songs-container">
            {console.log(isLoading)}
            {console.log(favoriteSongs)}
            {console.log(info)}
            {(songs.length > 0 && songs[0])
              && songs.map((song, index) => (
                <MusicCard
                  key={ index }
                  favoriteClicked="favorite-clicked"
                  checkedSong={ song.checked }
                  artworkUrl30={ song.artworkUrl30 }
                  album={ songs }
                  favoriteSongs={ songs }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                />))}
          </div>
        </div>
      </div>
    );
  }
}
