import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './MovieDetail.module.css';
import ScheduleSelector from '../ScheduleSelector/ScheduleSelector';
import {API_BASE_URL} from '../../config/config.js';


const MovieDetail = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}&i=${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return res.json();
            })
            .then((data) => {
                setMovie(data);
                setLoading(false);

            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!movie) return <div>Фильм не найден</div>;

    const imageUrl = movie.Poster;

    return (
        <div className={styles.contentWrapper}>
            <button onClick={() => window.history.back()} className={styles.backButton}>
                Назад
            </button>

            <div className={styles.movieContainer}>
                <img src={imageUrl} alt={movie.name} className={styles.movieImage}/>

                <div className={styles.textWrapper}>
                    <div className={expanded ? styles.fullTextBlock : styles.collapsedTextBlock}>

                        <p><strong>Рейтинг:</strong> IMDb — {movie.imdbRating}</p>

                        <p style={{ marginTop: '1rem' }}>{movie.Plot}</p>

                        <p><strong>Жанры:</strong> {movie.Genre}</p>
                        <p><strong>Год:</strong> {movie.Year}</p>
                        <p><strong>Страна:</strong> {movie.Country}</p>
                        <p><strong>Возрастной рейтинг:</strong> {movie.Rated}</p>
                        <p><strong>Длительность:</strong> {movie.Runtime}</p>
                        <p><strong>Режиссёр:</strong> {movie.Director}</p>
                        <p><strong>Актёры:</strong> {movie.Actors}</p>
                    </div>

                    <button
                        onClick={() => setExpanded(prev => !prev)}
                        className={styles.toggleButton}
                    >
                        {expanded ? 'Свернуть' : 'Развернуть'}
                    </button>
                </div>
            </div>
            <ScheduleSelector movieId={id} />
        </div>

    );
};

export default MovieDetail;
