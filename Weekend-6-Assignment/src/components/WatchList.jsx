import React from 'react';

const Watchlist = ({
  watchlist,
  onRemoveFromWatchlist
}) => {

  return (
    <div className="watchlist-card">

      {/* Header */}
      <div className="watchlist-header">

        <div className="d-flex justify-content-between align-items-center">

          <h5>
            ❤️ My Watchlist
          </h5>

          <span className="watchlist-count">
            {watchlist.length}
          </span>

        </div>

      </div>

      {/* Body */}
      <div>

        {watchlist.length === 0 ? (

          <div className="watchlist-empty">

            <div className="watchlist-empty-icon">
              🎬
            </div>

            <h6>
              Your watchlist is empty
            </h6>

            <p className="mb-0">
              Add movies you want to watch later.
            </p>

          </div>

        ) : (

          <ul className="list-group list-group-flush">

            {watchlist.map((movie) => (

              <li
                key={movie.id}
                className="list-group-item watchlist-item"
              >

                <div className="d-flex justify-content-between align-items-center gap-2">

                  <div>

                    <div className="watchlist-movie-title">
                      {movie.title}
                    </div>

                    <div className="watchlist-movie-info">
                      {movie.year} • {movie.genre}
                    </div>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      onRemoveFromWatchlist(movie.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
};

export default Watchlist;