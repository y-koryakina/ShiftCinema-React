import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import styles from "./Card.module.css";
import {ROUTES} from "../../config/routes.js";
import {Link} from "react-router-dom";


const Card = () => {
    return (
        <div className={styles.allWrapper}>
            <h2>Введите данные карты для оплаты</h2>
            <div>Шаг 3 из 3</div>
            <ProgressBar currentStep={3} totalSteps={3}/>
            <div className={styles.card}>
                <label className={styles.fieldBig}>
                    Номер*
                    <input className={styles.input} type="text" name="Number" placeholder="0000 0000"  />
                </label> <br/>

                <div className={styles.lowField}>
                    <label className={styles.field}>
                        Срок*
                        <input className={styles.input} type="text" name="Date" placeholder="00/00"  />
                    </label>
                    <label className={styles.field}>
                        CVV*
                        <input className={styles.input} type="text" name="Cvv" placeholder="0000"  />
                    </label>
                </div>
            </div>

            <div className={styles.btnContainer}>
                <button onClick={() => window.history.back()} className={styles.buttonBack}>Назад</button>
                <Link  to={ROUTES.SUCCESS}>
                    <button className={styles.buttonContinue} type="submit">Оплатить</button>
                </Link>
            </div>


        </div>
    );
};
export default Card;