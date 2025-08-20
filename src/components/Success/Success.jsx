import React from "react";
import styles from "./Success.module.css";
import {Link} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
const Card = () => {
    return(
        <div className={styles.allWrapper}>
            <div className={styles.logo}>
                <img src="/img/Accept.svg" alt="Логотип" className={styles.logoImg} />
                <h2>Оплата прошла успешно!</h2>
            </div>

            <div className={styles.block}>
                <div className={styles.group}>
                    <p className={styles.upP}>Номер билета</p>
                    <p className={styles.lowP}>777 </p>
                </div>
                <div className={styles.group}>
                    <p className={styles.upP}>Фильм</p>
                    <p className={styles.lowP}>Какой-то </p>
                </div>
                <div className={styles.group}>
                    <p className={styles.upP}>Дата и время</p>
                    <p className={styles.lowP}>3 июля 13 45 </p>
                </div>

                <div className={styles.group}>
                    <p className={styles.upP}>Ряд</p>
                    <p className={styles.lowP}>2</p>
                </div>
                <div className={styles.group}>
                    <p className={styles.upP}>Места</p>
                    <p className={styles.lowP}>8, 9</p>
                </div>

                <p className={styles.upP}>Вся информация была продублирована в SMS</p>
                <br/>



            </div>

            <div className={styles.btnContainer}>
                <button onClick={() => window.history.back()} className={styles.buttonBack}>Детали заказа</button>
                <Link  to={ROUTES.SUCCESS}>
                    <button className={styles.buttonContinue} type="submit">На главную</button>
                </Link>
            </div>





        </div>
    );
};
export default Card;