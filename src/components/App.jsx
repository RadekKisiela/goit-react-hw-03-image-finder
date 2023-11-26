import React, { Component } from 'react';
import axios from 'axios';
import css from './App.module.css';
import SearchBar from './searchbar/SearchBar';
import ImageGallery from './imagegallery/ImageGallery';
import Button from './button/Button';

const API_KEY = '38505453-c52f6e8f101e639f790909cc4';
const PER_PAGE = 12;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      isLoading: false,
      page: 1,
      searchQuery: '',
      selectedImage: null,
      totalImagesCount: 0,
      displayedImagesCount: 0,
    };
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}&min_width=640&min_height=480`
      );

      const newImages = response.data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalImagesCount: response.data.totalHits,
        displayedImagesCount: prevState.displayedImagesCount + newImages.length,
      }));
    } catch (error) {
      console.log('Error:', error);
    }

    this.setState({ isLoading: false });
  };

  handleSearchSubmit = query => {
    this.setState({
      images: [],
      searchQuery: query,
      page: 1,
      totalImagesCount: 0,
      displayedImagesCount: 0,
    });

    this.fetchImages();
  };

  handleLoadMore = () => {
    this.fetchImages();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    const { images } = this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        <Button onClick={this.handleLoadMore} />
      </div>
    );
  }
}

export default App;
