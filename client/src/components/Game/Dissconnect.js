import React from 'react';
import { useSelector } from 'react-redux';

const Dissconnect = () => {
    const dissconnected = useSelector((state) => state.game.dissconnect);

    const render = dissconnected.map((nick) => (
        <div
            className="dissconnect__msg"
            key={nick}
        >{`Oczekiwanie na ${nick}...`}</div>
    ));

    if (dissconnected.length === 0) return null;

    return <div className="dissconnect">{render}</div>;
};

export default Dissconnect;
