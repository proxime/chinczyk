import React from 'react';

import center from '../../images/center.svg';

const FieldsEnd = () => {
    const fields = [];
    const render = () => {
        for (let i = 0; i < 4; ++i) {
            fields.push(
                <div key={i} className={`fields-${i} fields-end`}>
                    <div className="field field-end-0"></div>
                    <div className="field field-end-1"></div>
                    <div className="field field-end-2"></div>
                    <div className="field field-end-3"></div>
                    <div className="field field-end-4"></div>
                    <div className="field field-end-5"></div>
                </div>
            );
        }
    };
    render();

    return (
        <>
            {fields}
            <div className="field-center">
                <img src={center} alt="" />
            </div>
        </>
    );
};

export default FieldsEnd;
