import React from 'react';
import Area from './Area';

const Areas = () => {
    const areas = [];
    const render = () => {
        for (let i = 0; i < 4; ++i) {
            areas.push(<Area key={i} number={i} />);
        }
    };
    render();

    return <div className="areas">{areas}</div>;
};

export default Areas;
