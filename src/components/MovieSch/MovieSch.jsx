import React, { useEffect, useState } from "react";
import {useParams, useLocation, Link} from "react-router-dom";
import styles from "./MovieSch.module.css";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import { API_BASE_URL } from '../../config/config.js';
import {ROUTES} from "../../config/routes.js";

//МНЕ НИКОГДА ЭТО НЕ ПОНЯТЬ
const MovieSch = () => {
    const { movieId } = useParams();
    const location = useLocation(); //новый хук, чтоб понять куда тыкнули на прошлой странице
    const { date, hallName, time } = location.state || {};

    const [schedules, setSchedules] = useState([]);
    const [selectedSeance, setSelectedSeance] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]); //то что выберет пользователь
    const [hoveredSeat, setHoveredSeat] = useState(null); //мышь наведена ИЛИ НЕТ
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 }); //что это???
    //tooltipPos - ???

    useEffect(() => {
        fetch('/data/mockSchedule.json')
            .then((res) => res.json())
            .then((data) => setSchedules(data.schedules));
    }, [movieId]);

    useEffect(() => {
        if (!date || !time || !hallName || schedules.length === 0) return;

        const day = schedules.find((s) => s.date === date); //ну и тут что такое s
        const seance = day?.seances.find( //почему тут знак вопроса, а в прошлой строке его нет
            (s) => s.time === time && s.hall.name === hallName
        );
        //что из себя представляет сущность "сеанс"? почему именно ее не передали по location
        //может это как-то связано с тем, что плохо передавать целые обьекты и лучше проские пропс?
        //а ну или скорее всего потому что ее как обьекта нет в json, это мы ее придумали... хз

        if (seance) setSelectedSeance(seance);
    }, [schedules, date, time, hallName]);

    //вот я теперь вижу обычные js функции и у меня много вопросов к тому, что с ними происходит при перерендеринге
    const handleSeatToggle = (rowIdx, colIdx) => { //обычная js функция. что делает? что такое toggle
        const key = `${rowIdx}-${colIdx}`;
        setSelectedSeats((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    // Формируем текст выбранных мест
    const selectedSeatsText =
        selectedSeats.length === 0
            ? "не выбраны"
            : selectedSeats
                .map((key) => {
                    const [row, col] = key.split("-").map(Number);
                    return `${row + 1} ряд, ${col + 1} место`;
                })
                .join("; ");



    return (
        <div>
            <button onClick={() => window.history.back()}>Назад</button>
            <h2>Выбор места</h2>
            <div>Шаг 1 из 3</div>
            <ProgressBar currentStep={1} totalSteps={3} />

            <p>Зал: {hallName}</p>
            <p>Дата и время: {date}, {time}</p>

            {selectedSeance ? (
                <div style={{ marginTop: "20px", position: "relative" }}>
                    <div className={styles.hallContainer}>
                        <div className={styles.screenWrapper}>
                            <div className={styles.screenText}>Экран</div>
                            <div className={styles.screenLine}></div>
                        </div>

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

                        <div style={{ marginTop: "10px", fontWeight: "bold",  marginBottom: "20px", }}>
                            Выбранные места: {selectedSeatsText}
                        </div>

                        <Link to={ROUTES.DATA_FORM}>
                            <button disabled={selectedSeats.length === 0}>Купить</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p>Загружаем сеанс...</p>
            )}
        </div>
    );
};

export default MovieSch;
