import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';
import {ROUTES} from "../../config/routes.js";

const MovieCard = ({ movie }) => {
    const imageUrl = movie.Poster;
    return (
        <div className={styles.movieCard}>
            <div>
                <img src={imageUrl} alt={movie.name} className={styles.movieCardPoster} />
                <h3>{movie.Title} </h3>
                <p>Фильм</p>
            </div>

            <div>

                <div>
                    <img src="/img/YelStar.svg" alt="Звезда" className={styles.starImg} />
                    <img src="/img/YelStar.svg" alt="Звезда" className={styles.starImg} />
                    <img src="/img/YelStar.svg" alt="Звезда" className={styles.starImg} />
                    <img src="/img/YelStar.svg" alt="Звезда" className={styles.starImg} />
                    <img src="/img/YelStar.svg" alt="Звезда" className={styles.starImg} />
                </div>
                <p>Кинопоиск - {movie.userRatings.kinopoisk}</p>
                <Link to={ROUTES.MOVIE_DETAIL(movie.imdbID)}>
                    <button>Подробнее</button>
                </Link>

            </div>

        </div>
    );
};

export default MovieCard;
