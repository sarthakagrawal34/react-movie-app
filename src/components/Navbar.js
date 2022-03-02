import React from "react";
import { handleMovieSearch } from './actions';

class Navbar extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    handleSearch = () => {
        const { searchText } = this.state;

        this.props.dispatch(handleMovieSearch(searchText));
    };

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    };

    render() {
        const { result } = this.props.search;  
        return (
          <div className="nav">
            <div className="search-container">
              <input onChange={this.handleChange} />
              <button id="search-btn" onClick={this.handleSearch}>Search</button>
            </div>
          </div>
        );
    }
}

export default Navbar;
