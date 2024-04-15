import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com?apikey=${import.meta.env.VITE_API_KEY}`;

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };
    useEffect(() => {
        searchMovie("Spiderman");
    }, []);

    return (
        <div className="app">
            <h1>Movies</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => {
                        searchMovie(searchTerm);
                    }}
                />
            </div>
            <div className="container">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            Title={movie.Title}
                            Year={movie.Year}
                            Type={movie.Type}
                            Poster={movie.Poster}
                        />
                    ))
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
