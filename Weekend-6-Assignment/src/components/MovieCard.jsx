import React from 'react';

const MovieCard = ({
  movie,
  onAddToWatchlist,
  isAdded
}) => {

  const {
    title,
    genre,
    year,
    rating,
    poster
  } = movie;

  return (
    <div className="col-12 col-md-6 col-lg-6 mb-4">

      <div className="movie-card">

        {/* Movie Poster */}
        <img
          src={
            poster ||
            "https://via.placeholder.com/300x400?text=No+Poster"
          }
          className="movie-poster"
          alt={title}
        />

        {/* Movie Details */}
        <div className="movie-card-body">

          <div className="d-flex justify-content-between align-items-start">

            <h5 className="movie-title mb-0">
              {title}
            </h5>

            <span className="movie-rating">
              ★ {rating}
            </span>

          </div>

          <div className="movie-info">

            <span>
              📅 {year}
            </span>

            <span className="mx-2">•</span>

            <span className="movie-genre">
              {genre}
            </span>

          </div>

          <button
            className={`watchlist-btn ${
              isAdded
                ? 'added-btn'
                : 'add-btn'
            }`}
            onClick={() =>
              onAddToWatchlist(movie)
            }
            disabled={isAdded}
          >
            {isAdded
              ? '✓ Added to Watchlist'
              : '＋ Add to Watchlist'}
          </button>

        </div>

      </div>

    </div>
  );
};

export default MovieCard;