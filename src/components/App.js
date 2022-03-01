import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovies, setShowFavourites } from './actions';

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    });

    // Make api calls
    // Dispatch action
    store.dispatch(addMovies(data));

    console.log('STATE', store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState(); 
    const { favourites } = movies;
    const index = favourites.indexOf(movie);

    if (index !== -1) {
      // found the movie in favourites
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };

  render() {
    const { movies } = this.props.store.getState(); // [movies: {}, search: {}]
    const { list, favourites, showFavourites } = movies; // {list: [], favourites:[], showFavourites: false}
    console.log('RENDER', this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${!showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies"> No Favourites!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
