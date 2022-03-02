import {
  ADD_MOVIES,
  ADD_SEARCH_RESULT,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
} from '../actions';
import { combineReducers } from "redux";
// Movie Reducer
const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites: false,
};

export function moviesReducer(state = initialMoviesState, action) {
    // if (action.type === ADD_MOVIES) {
    //     return {
    //         ...state,
    //         list: action.movies,
    //     };
    // }
    // return state;

    console.log("MOVIE REDUCER");
    switch (action.type) {
        case ADD_MOVIES: 
            return {
                ...state,
                list: action.movies,
            };
        
        case ADD_TO_FAVOURITES:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites],
            };
        
        case REMOVE_FROM_FAVOURITES:
            const filteredArray = state.favourites.filter(
                (movie) => movie.Title !== action.movie.Title
            );
            return {
                ...state,
                favourites: filteredArray,
            };
        
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val,
            };
        
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list],
            };
        
        default:
            return state;
    };
};

// Search Reducer
const initialSearchState = {
  result: {},
  showSearchResults: false,
};

export function searchReducer(state = initialMoviesState, action) {
  console.log('SEARCH REDUCER');
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true
            };
        
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false,
            };
        
        default:
            return state;
    };
}


// Default Reducers that is our root reducer combining both reducers
// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState,

// };

// export default function rootReducer(state = initialRootState, action) {
//     return {
//         movies: moviesReducer(state.movies, action),
//         search: searchReducer(state.search, action),
//     };
// };

export default combineReducers({
    movies: moviesReducer,
    search: searchReducer,
});
