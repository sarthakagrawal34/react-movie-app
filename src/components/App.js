import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovies, setShowFavourites } from './actions';
import { connect } from '../index';

class App extends React.Component {
  componentDidMount() {
    // Make api calls
    // Dispatch action
    this.props.dispatch(addMovies(data));

    // console.log('STATE', store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props; 
    const { favourites } = movies;
    const index = favourites.indexOf(movie);

    if (index !== -1) {
      // found the movie in favourites
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    const { movies, search } = this.props; // [movies: {}, search: {}]
    const { list, favourites, showFavourites } = movies; // {list: [], favourites:[], showFavourites: false}
    console.log('RENDER', this.props);

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
                dispatch={this.props.dispatch}
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
  };
};

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store = {store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  }
};
  
const connectedComponent = connect(mapStateToProps)(App);

export default connectedComponent;
