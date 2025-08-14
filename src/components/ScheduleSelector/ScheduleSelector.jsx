import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ScheduleSelector.module.css';
import { API_BASE_URL } from '../../config/config.js';
import {ROUTES} from "../../config/routes.js";


//передаем в него Id фильма через проп - что проп а что не проп.. это связано с компонентами только? или с js func
const ScheduleSelector = ({ movieId }) => {
    const [schedules, setSchedules] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selected, setSelected] = useState({ hallName: null, time: null });
    //тут const относится к функции? к хуку? а где название... или это анонимная функция

    useEffect(() => {
        fetch('/data/mockSchedule.json')
            .then(res => res.json())
            .then(data => {
                setSchedules(data.schedules);
            });
    }, [movieId]);


    //вот эта штука будет выполняться при каждом перерендере? будет ли обновляться каждый раз ссылка на нее?
    //с другой стороны мы ее никуда дальше не передаем
    const getHallsForSelectedDay = () => { //обычная js функция
        const daySchedule = schedules.find(s => s.date === selectedDay); //что за буква s, откуда она
        if (!daySchedule) return [];

        const hallsMap = {};

        for (const seance of daySchedule.seances) {
            const hallName = seance.hall.name;
            if (!hallsMap[hallName]) {
                hallsMap[hallName] = new Set();
            }
            hallsMap[hallName].add(seance.time); // то есть время СЕАНСА добавляем в set по ключу "ЗАЛ"?
            //это мапа из сетов или что...
            //мы когда ее создали назвали map, но объявили как {}
        }


        //Во что мы вот это вот конвертировали??
        //кошмар
        return Object.entries(hallsMap).map(([name, timesSet], i) => ({
            id: i + 1, // просто индекс, не обязательно
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
