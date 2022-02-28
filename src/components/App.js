import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovies } from './actions';

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

    console.log('AFTER STATE', store.getState());
  }
  render() {
    const movies = this.props.store.getState();
    console.log('RENDER');
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={`movie-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
