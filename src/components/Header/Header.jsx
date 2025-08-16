import React from 'react';
import styles from './Header.module.css';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                <div className={styles.logo}>
                    ШИФТ CINEMA
                </div>
                <img src="/img/Group_34.svg" alt="Логотип" className={styles.logoImg} />
            </div>

            <nav className={styles.nav}>
                <div className={styles.wrapper}>
                    <img src="/img/User.svg" alt="Логотип" className={styles.logoImg} />
                    <a>Профиль</a>
                </div>
                <div className={styles.wrapper}>
                    <img src="/img/Ticket.svg" alt="Логотип" className={styles.ticketImg} />
                    <a>Билеты</a>
                </div>

            </nav>

            <div className={styles.leftWrapper}>
                <img src="/img/Exit.svg" alt="Логотип" className={styles.ticketImg} />

                <button className={styles.exitButton}>
                    Выйти
                </button>
            </div>

            <img src="/img/Sun.svg" alt="Логотип" className={styles.sunImg} />
        </div>
    </header>
);

export default Header;
