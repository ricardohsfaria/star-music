import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from './Loading';
import Album from '../components/AlbumCard';

const MIN_SEARCH_LENGTH = 2;

export default class Search extends Component {
  state = {
    search: '',
    isSearchButtonDisabled: true,
    isLoading: false,
    success: false,
    results: [],
  };

  searchResults = async () => {
    const { search } = this.state;
    this.setState({ isLoading: true });

    const data = await searchAlbumsAPI(search);
    this.setState({
      results: data,
      resultFor: search,
      search: '',
      isSearchButtonDisabled: true,
      isLoading: false,
      success: true,
    });
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
      isLoading,
      resultFor,
      results,
      success,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form onSubmit={ this.searchClick }>
            <label htmlFor="search">
              <input
                type="text"
                data-testid="search-artist-input"
                value={ search }
                onChange={ this.toggleSearchButton }
                id="search"
                name="search"
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ isSearchButtonDisabled }
              onChange={ this.toggleSearchButton }
            >
              Pesquisar

            </button>
          </form>
        </div>
        <div>{isLoading && <Loading />}</div>
        <section>
          <span>
            {success && `Resultado de álbuns de: ${resultFor}`}
          </span>
        </section>
        <span>
          {success && results.length === 0 && 'Nenhum álbum foi encontrado'}
        </span>
        <section>
          {success && results.map((
            {
              artistName,
              collectionId,
              collectionName,
              artworkUrl100,
              releaseDate,
            },
          ) => (<Album
            key={ collectionId }
            img={ artworkUrl100 }
            artistName={ artistName }
            albumName={ collectionName }
            releaseDate={ releaseDate }
            albumId={ collectionId }
          />))}
        </section>
      </div>
    );
  }
}
