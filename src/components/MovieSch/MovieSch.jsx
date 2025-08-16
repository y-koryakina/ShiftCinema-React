import React, { useEffect, useState } from "react";
import {useParams, useLocation, Link} from "react-router-dom";
import styles from "./MovieSch.module.css";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import {ROUTES} from "../../config/routes.js";

const MovieSch = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const { date, hallName, time } = location.state || {};

    const [schedules, setSchedules] = useState([]);
    const [selectedSeance, setSelectedSeance] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        fetch('/data/mockSchedule.json')
            .then((res) => res.json())
            .then((data) => setSchedules(data.schedules));
    }, [movieId]);

    useEffect(() => {
        if (!date || !time || !hallName || schedules.length === 0) return;

        const day = schedules.find((s) => s.date === date);
        const seance = day?.seances.find(
            (s) => s.time === time && s.hall.name === hallName
        );


        if (seance) setSelectedSeance(seance);
    }, [schedules, date, time, hallName]);

    const handleSeatToggle = (rowIdx, colIdx) => {
        const key = `${rowIdx}-${colIdx}`;
        setSelectedSeats((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const selectedSeatsText =
        selectedSeats.length === 0
            ? "-"
            : selectedSeats
                .map((key) => {
                    const [row, col] = key.split("-").map(Number);
                    return `${row + 1} ряд, ${col + 1} место`;
                })
                .join("; ");

    return (
        <div className={styles.allWrapper}>
            <h2>Выбор места</h2>
            <div>Шаг 1 из 3</div>
            <ProgressBar currentStep={1} totalSteps={3} />

            {selectedSeance ? (
                <div style={{ marginTop: "20px", position: "relative" }}>
                    <div className={styles.hallContainer}>
                        <div className={styles.screenWrapper}>
                            <div className={styles.screenText}>Экран</div>
                            <div className={styles.screenLine}></div>
                        </div>

                        <p className={styles.upP}>Ряд</p>

                        <div className={styles.seatingArea}>
                            {selectedSeance.hall.places.map((row, rowIdx) => (
                                <div key={rowIdx} className={styles.row}>
                                    <div className={styles.rowNumber}>{rowIdx + 1}</div>
                                    {row.map((place, colIdx) => {
                                        const key = `${rowIdx}-${colIdx}`;
                                        const selected = selectedSeats.includes(key);
                                        const isBlocked = place.type === "BLOCKED";
                                        const isPayed = place.type === "PAYED";

                                        let className = styles.seat;
                                        if (isBlocked) className += ` ${styles.blocked}`;
                                        else if (isPayed) className += ` ${styles.payed}`;
                                        else if (selected) className += ` ${styles.selected}`;
                                        else className += ` ${styles.free}`;

                                        return (
                                            <div
                                                key={colIdx}
                                                className={className}
                                                onClick={() =>
                                                    !isBlocked && !isPayed && handleSeatToggle(rowIdx, colIdx)
                                                }
                                                onMouseEnter={(e) => {
                                                    setHoveredSeat({ row: rowIdx, col: colIdx });
                                                    setTooltipPos({ x: e.clientX, y: e.clientY });
                                                }}
                                                onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                                                onMouseLeave={() => {
                                                    setHoveredSeat(null);
                                                    setTooltipPos({ x: 0, y: 0 });
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>


                    {hoveredSeat && (
                        <div
                            className={styles.tooltip}
                            style={{
                                position: "fixed",
                                left: tooltipPos.x + 15,
                                top: tooltipPos.y - 40,
                                pointerEvents: "none",
                                zIndex: 1000,
                            }}
                        >
                            <strong>
                                {selectedSeance?.hall?.places?.[hoveredSeat.row]?.[hoveredSeat.col]?.price ?? 0} ₽
                            </strong>{" "}
                            &nbsp; <button className={styles.close}>×</button>
                            <div>
                                {hoveredSeat.row + 1} ряд, {hoveredSeat.col + 1} место
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: "20px" }}>

                        <div className={styles.upContainer}>
                            <p className={styles.upP}>Зал</p>
                            <p>{hallName} </p>
                        </div>

                        <div className={styles.upContainer}>
                            <p className={styles.upP}>Дата и время</p>
                            <p>{date} {time}</p>
                        </div>


                        <div className={styles.upContainer}>
                            <p className={styles.upP}>Места</p>
                            <p>{selectedSeatsText}</p>
                        </div>

                        <div className={styles.buttons}>
                            <button onClick={() => window.history.back()} className={styles.backButton}>Назад</button>

                            <Link to={ROUTES.DATA_FORM}>
                                <button disabled={selectedSeats.length === 0} className={styles.buyButton}>Купить</button>
                            </Link>
                        </div>

                    </div>
                </div>
            ) : (
                <p>Загружаем сеанс...</p>
            )}
        </div>
    );
};

export default MovieSch;
