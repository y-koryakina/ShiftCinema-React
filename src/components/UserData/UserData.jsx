import React, {useState} from "react";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import styles from "./UserData.module.css";

const UserData = () => {
    const [form, setForm] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        email: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', form);
    };


    return (
        <div>
            <h2>Введите ваши данные</h2>
            <div>Шаг 2 из 3</div>
            <ProgressBar currentStep={2} totalSteps={3}/>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.field}>
                    Фамилия*
                    <input className={styles.input} type="text" name="lastName" placeholder="Фамилия" value={form.lastName} onChange={handleChange} />
                </label>
                <br />

                <label className={styles.field}>
                    Имя*
                    <input className={styles.input} type="text" name="firstName" placeholder="Имя" value={form.firstName} onChange={handleChange} />
                </label>
                <br />

                <label className={styles.field}>
                    Номер телефона*
                    <input className={styles.input} type="tel" name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} />
                </label>
                <br />

                <label className={styles.field}>
                    Email
                    <input className={styles.input} type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                </label>
                <br />

                <label className={styles.field}>
                    Адрес
                    <input className={styles.input} type="text" name="address" placeholder="Адрес" value={form.address} onChange={handleChange} />
                </label>
                <br />


                <button className={styles.buttonBack} onClick={() => window.history.back()}>Назад</button>
                <button className={styles.buttonContinue} type="submit">Продолжить</button>
            </form>
        </div>
    );
};

export default UserData;