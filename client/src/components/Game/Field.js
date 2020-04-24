import React from 'react';

const Field = ({ number, fieldFunction }) => {
    return <div className={`field field-${number} ${fieldFunction}`}></div>;
};

export default Field;
