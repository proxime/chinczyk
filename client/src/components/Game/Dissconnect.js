import React from 'react';
import { useSelector } from 'react-redux';
import DissconnectAlert from './DissconnectAlert';

const Dissconnect = () => {
    const dissconnected = useSelector((state) => state.game.dissconnect);

    const render = dissconnected.map((nick) => (
        <DissconnectAlert nick={nick} key={nick} />
    ));

    if (dissconnected.length === 0) return null;

    return <div className="dissconnect">{render}</div>;
};

export default Dissconnect;
