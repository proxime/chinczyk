import React from 'react';

const Areas = () => {
    const areas = [];
    const render = () => {
        for (let i = 0; i < 4; ++i) {
            areas.push(
                <div key={i} className={`area area-${i}`}>
                    <div className="area__items">
                        <div className="area__item">
                            <div className="area__center"></div>
                        </div>
                        <div className="area__item">
                            <div className="area__center"></div>
                        </div>
                        <div className="area__item">
                            <div className="area__center"></div>
                        </div>
                        <div className="area__item">
                            <div className="area__center"></div>
                        </div>
                    </div>
                </div>
            );
        }
    };
    render();

    return <div className="areas">{areas}</div>;
};

export default Areas;
