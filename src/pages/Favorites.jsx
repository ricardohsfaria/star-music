import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

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
    const { songs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {(songs.length > 0 && songs[0]) && songs.map((song, index) => (<MusicCard key={ index } checkedSong={ song.checked } album={ songs } favoriteSongs={ songs } trackName={ song.trackName } previewUrl={ song.previewUrl } trackId={ song.trackId } />))}
        </div>
      </div>
    );
  }
}
