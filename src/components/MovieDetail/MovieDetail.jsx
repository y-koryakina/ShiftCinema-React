import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './MovieDetail.module.css';
import ScheduleSelector from '../ScheduleSelector/ScheduleSelector';
import {API_BASE_URL} from '../../config/config.js';
import mockMovies from '../../../public/data/mockMovies.json';



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
                const mock = mockMovies.find(m => m.imdbID === id);
                const mergedMovie = { ...data, ...mock };
                setMovie(mergedMovie);
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
                <img src={"/img/ArrowLeft.svg"} alt={"Стрелка"} className={styles.arrow}/>
                <p className={styles.backText}>Назад </p>
            </button>

            <div className={styles.movieContainer}>
                <img src={imageUrl} alt={movie.name} className={styles.movieImage}/>

                <div className={styles.textWrapper}>
                    <div className={expanded ? styles.fullTextBlock : styles.collapsedTextBlock}>

                        <h2>{movie.Title} ({movie.Rated}) </h2>
                        <p className={styles.greyText}>Фильм</p>
                        <div className={styles.starGap}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <img
                                    key={i}
                                    src={i < Math.round(movie.userRatings.kinopoisk / 2) ? "/img/YelStar.svg" : "/img/WhiteStar.svg"}
                                    alt="Звезда"
                                    className={styles.starImg}
                                />
                            ))}
                        </div>
                        <p className={styles.greyText}>Кинопоиск - {movie.userRatings.kinopoisk}</p>


                        <p style={{ marginTop: '1rem' }}>
                            {expanded ? movie.Plot : `${movie.Plot.slice(0, 150)}...`}{" "}
                            <button
                                onClick={() => setExpanded(prev => !prev)}
                                className={styles.toggleButton}
                            >
                                {expanded ? 'Свернуть' : 'Раскрыть'}
                            </button>
                        </p>


                    </div>


                </div>
            </div>
            <ScheduleSelector movieId={id} />
        </div>

    );
};

export default MovieDetail;
