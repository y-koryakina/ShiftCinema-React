import React from "react";

const Card = () => {
    return (
        <div>
            <button onClick={() => window.history.back()}>Назад</button>
            <p>New</p>
        </div>
    );
};
export default Card;