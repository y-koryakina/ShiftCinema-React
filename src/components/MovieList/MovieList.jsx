import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import styles from './MovieList.module.css';
import { API_BASE_URL } from '../../config/config.js';
import mockMovies from '../../../public/data/mockMovies.json';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}&s=batman`)
            .then(res => res.json())
            .then(data => {
                const apiMovies = data.Search || [];
                const mergedMovies = apiMovies.map(movie => {
                    const mock = mockMovies.find(m => m.imdbID === movie.imdbID);
                    return { ...movie, ...mock };
                });
                setMovies(mergedMovies);
            })
            .catch(err => {
                console.error('Ошибка загрузки фильмов:', err);
            });
    }, []);

    return (
        <section className={styles.section}>
            <h2>Афиша</h2>
            <div className={styles.movieList}>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;
