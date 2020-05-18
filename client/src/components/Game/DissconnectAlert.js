import React, { useState, useEffect } from 'react';

const DissconnectAlert = ({ nick }) => {
    const [time, setTime] = useState(60);

    useEffect(() => {
        const index = setInterval(() => {
            setTime((prevState) => prevState - 1);
        }, 1000);

        return () => {
            clearInterval(index);
        };
    }, []);

    return (
        <div
            className="dissconnect__msg"
            key={nick}
        >{`Oczekiwanie na ${nick} ${time}...`}</div>
    );
};

export default DissconnectAlert;
