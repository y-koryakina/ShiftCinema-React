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

    useEffect(() => {
        if (schedules.length > 0 && !selectedDay) {
            setSelectedDay(schedules[0].date);
        }
    }, [schedules, selectedDay]);

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

    function parseCustomDate(dateStr) {
        const [day, month, year] = dateStr.split('.').map(Number);
        return new Date(2000 + year, month - 1, day);
    }

    return (
        <div className={styles.scheduleWrapper}>
            <h3>Расписание</h3>

            <div className={styles.dayRow}>
                {schedules.map(({ date }, index) => (
                    <React.Fragment key={date}>
                        <button
                            className={date === selectedDay ? styles.activeButton : styles.dayButton}
                            onClick={() => {
                                setSelectedDay(date);
                                setSelected({ hallName: null, time: null });
                            }}
                        >
                            {new Intl.DateTimeFormat('ru-RU', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short'
                            }).format(parseCustomDate(date))}
                        </button>

                        {index < schedules.length - 1 && (
                            <span className={styles.separator}>|</span>
                        )}

                    </React.Fragment>
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
                                                ? styles.activeTimeButton
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
