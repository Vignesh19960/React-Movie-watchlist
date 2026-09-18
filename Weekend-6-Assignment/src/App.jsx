import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import Watchlist from './components/WatchList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi'];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const response = await axios.get('/movies.json');
        setMovies(response.data);
      } catch (error) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToWatchlist = (movieToAdd) => {
    if (!watchlist.some((movie) => movie.id === movieToAdd.id)) {
      setWatchlist([...watchlist, movieToAdd]);
    }
  };

  const handleRemoveFromWatchlist = (movieId) => {
    setWatchlist(
      watchlist.filter((movie) => movie.id !== movieId)
    );
  };

  const filteredMovies =
    selectedGenre === 'All'
      ? movies
      : movies.filter(
          (movie) => movie.genre === selectedGenre
        );

  return (
    <div className="movie-app">

      {/* Header */}
      <nav className="navbar navbar-expand-lg movie-navbar">
        <div className="container">
          <span className="navbar-brand movie-logo">
            🎬 <span>TamilFlix</span>
          </span>

          <div className="watchlist-counter">
            ❤️ {watchlist.length} Movies
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="hero-small-text">
              🎥 YOUR PERSONAL MOVIE COLLECTION
            </span>

            <h1>
              Discover Tamil Movies
            </h1>

            <p>
              Explore your favourite movies and build
              your personal watchlist.
            </p>
          </div>
        </div>
      </section>

      <div className="container main-container">

        <div className="row g-4">

          {/* Movies */}
          <div className="col-lg-8">

            {/* Genre Filter */}
            <div className="filter-box">
              <h5>🎞️ Browse by Genre</h5>

              <div className="genre-buttons">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`genre-btn ${
                      selectedGenre === genre
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setSelectedGenre(genre)
                    }
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="loading-box">
                <div
                  className="spinner-border"
                  role="status"
                ></div>

                <h5>Loading Movies...</h5>

                <p>
                  Fetching Tamil movies for you
                </p>
              </div>

            ) : filteredMovies.length === 0 ? (

              /* No Movies */
              <div className="no-movies">
                <div className="no-movies-icon">
                  🎬
                </div>

                <h4>No movies found</h4>

                <p>
                  No movies are available in the{' '}
                  <strong>{selectedGenre}</strong> genre.
                </p>
              </div>

            ) : (

              /* Movie Cards */
              <div className="row">
                {filteredMovies.map((movie) => {

                  const isAdded =
                    watchlist.some(
                      (item) =>
                        item.id === movie.id
                    );

                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onAddToWatchlist={
                        handleAddToWatchlist
                      }
                      isAdded={isAdded}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Watchlist */}
          <div className="col-lg-4">
            <Watchlist
              watchlist={watchlist}
              onRemoveFromWatchlist={
                handleRemoveFromWatchlist
              }
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;