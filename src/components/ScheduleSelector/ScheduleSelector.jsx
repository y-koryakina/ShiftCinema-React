import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ScheduleSelector.module.css';
import {ROUTES} from "../../config/routes.js";


const ScheduleSelector = ({ movieId }) => {
    const [schedules, setSchedules] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selected, setSelected] = useState({ hallName: null, time: null });

    useEffect(() => {
        fetch('/data/mockSchedule.json')
            .then(res => res.json())
            .then(data => {
                setSchedules(data.schedules);
            });
    }, [movieId]);


    const getHallsForSelectedDay = () => {
        const daySchedule = schedules.find(s => s.date === selectedDay);
        if (!daySchedule) return [];

        const hallsMap = {};

        for (const seance of daySchedule.seances) {
            const hallName = seance.hall.name;
            if (!hallsMap[hallName]) {
                hallsMap[hallName] = new Set();
            }
            hallsMap[hallName].add(seance.time);
        }

        //кошмар
        return Object.entries(hallsMap).map(([name, timesSet], i) => ({
            id: i + 1,
            name,
            times: Array.from(timesSet).sort(),
        }));
    };

    return (
        <div className={styles.scheduleWrapper}>
            <h2>Расписание</h2>

            <div className={styles.dayRow}>
                {schedules.map(({ date }) => (
                    <button
                        key={date}
                        className={date === selectedDay ? styles.activeButton : styles.dayButton}
                        onClick={() => {
                            setSelectedDay(date);
                            setSelected({ hallName: null, time: null });
                        }}
                    >
                        {date}
                    </button>
                ))}
            </div>

            <div className={styles.scheduleBlock}>
                {selectedDay &&
                    getHallsForSelectedDay().map(hall => (
                        <div key={hall.id} className={styles.hallRow}>
                            <div className={styles.hallName}>{hall.name}</div>
                            <div className={styles.timeRow}>
                                {hall.times.map(time => (
                                    <button
                                        key={time}
                                        className={
                                            selected.hallName === hall.name && selected.time === time
                                                ? styles.activeButton
                                                : styles.timeButton
                                        }
                                        onClick={() => setSelected({ hallName: hall.name, time })}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>

            <Link
                to={ROUTES.SEANCE(movieId)}
                state={{
                    date: selectedDay,
                    hallName: selected.hallName,
                    time: selected.time,
                }}
            >
                <button
                    className={styles.continueButton}
                    disabled={!selectedDay || !selected.time}
                >
                    Продолжить
                </button>
            </Link>
        </div>
    );
};

export default ScheduleSelector;
