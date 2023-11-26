import React from 'react';
import css from './App.module.css';

import SearchBar from './searchbar/SearchBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
    };
    this.API_KEY = '38505453-c52f6e8f101e639f790909cc4';
  }
  handleSearch = query => {
    this.setState({ query });
  };
  fetchData = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${this.state.query}&page=1&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.setState({ images: data.hits });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  render() {
    return (
      <div className={css.App}>
        <SearchBar handleSearch={this.handleSearch} />
      </div>
    );
  }
}

export default App;
