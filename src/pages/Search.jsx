import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Album from '../components/AlbumCard';
import './Search.css';
import SearchLoading from '../components/SearchLoading';
import Logo from '../img/logo.png';

const MIN_SEARCH_LENGTH = 2;
const LOADING_TIME = 3000;

export default class Search extends Component {
  state = {
    search: 'Sigrid',
    isSearchButtonDisabled: true,
    isLoading: false,
    success: false,
    results: [],
  };

  componentDidMount() {
    this.searchResults();
  }

  searchResults = async () => {
    const { search } = this.state;
    this.setState({ isLoading: true });

    const data = await searchAlbumsAPI(search);
    setTimeout(() => {
      this.setState({
        results: data,
        resultFor: search,
        search: '',
        isLoading: true,
        isSearchButtonDisabled: true,
        success: true,
      });
    }, LOADING_TIME);
  };

  toggleSearchButton = ({ target }) => {
    const { name } = target;
    const { value } = target;
    let isSearchButtonDisabled = true;
    const lengthValidation = value.length >= MIN_SEARCH_LENGTH;
    if (lengthValidation) isSearchButtonDisabled = false;
    this.setState({
      [name]: value,
      isSearchButtonDisabled,
    });
  };

  searchClick = (e) => {
    e.preventDefault();
    this.searchResults();
  };

  render() {
    const {
      search,
      isSearchButtonDisabled,
      resultFor,
      isLoading,
      results,
      success,
    } = this.state;
    return (
      <div className="search-page" data-testid="page-search">
        <div className="main">
          <Header />
        </div>
        <div className="content-wrapper">
          <div className="search-bar-container">
            <div className="logo-container-mobile">
              <img src={ Logo } alt="logo" className="logo" />
            </div>
            <form onSubmit={ this.searchClick } className="search-bar">
              {console.log(isLoading)}
              <div className="search-container">
                <FontAwesomeIcon icon={ faSearch } className="search-input-icon" />
                <input
                  type="text"
                  data-testid="search-artist-input"
                  value={ search }
                  onChange={ this.toggleSearchButton }
                  id="search"
                  name="search"
                  placeholder="ARTIST NAME"
                  className="search-bar-input"
                />
              </div>
              <button
                className="search-button"
                data-testid="search-artist-button"
                type="submit"
                disabled={ isSearchButtonDisabled }
                onChange={ this.toggleSearchButton }
              >
                SEARCH
              </button>
            </form>
          </div>
          <div className="gradient-cloud" />
          <div>
            <section>
              <p className="results-message">
                {success && `Search results for ${resultFor}`}
              </p>
            </section>
            <span>
              {success && results.length === 0 && 'No albums were found :('}
            </span>
            <section className="albums-container">
              {!success ? <SearchLoading /> : results.map((
                {
                  artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                },
              ) => (<Album
                key={ collectionId }
                img={ artworkUrl100 }
                artistName={ artistName }
                albumName={ collectionName }
                albumId={ collectionId }
              />))}
            </section>
          </div>
        </div>
      </div>
    );
  }
}
