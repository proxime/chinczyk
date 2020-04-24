import React, { useState, useEffect } from 'react';
import Field from './Field';
import FieldsEnd from './FieldsEnd';

const Fields = () => {
    const [fieldsArray, setFieldsArray] = useState([]);

    useEffect(() => {
        for (let i = 1; i < 53; ++i) {
            let fieldFunction = '';
            if (i === 1) {
                fieldFunction = `field-start-0`;
            } else if (i === 14) {
                fieldFunction = `field-start-1`;
            } else if (i === 27) {
                fieldFunction = `field-start-2`;
            } else if (i === 40) {
                fieldFunction = `field-start-3`;
            } else if (i === 9 || i === 22 || i === 35 || i === 48) {
                fieldFunction = `field-safe`;
            }

            setFieldsArray(prevState => [
                ...prevState,
                <Field key={i} number={i} fieldFunction={fieldFunction} />,
            ]);
        }
    }, []);

    return (
        <div className="fields">
            {fieldsArray}
            <FieldsEnd />
        </div>
    );
};

export default Fields;
