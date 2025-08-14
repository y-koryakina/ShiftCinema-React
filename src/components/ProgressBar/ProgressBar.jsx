import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ currentStep, totalSteps }) => {
    const progressPercent = (currentStep / totalSteps) * 100;

    return (
        <div className={styles.progressWrapper}>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar; //зачем это писать
