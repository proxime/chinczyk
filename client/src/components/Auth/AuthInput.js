import React, { useEffect, useRef } from 'react';

const Input = props => {
    const inputEl = useRef(null);

    useEffect(() => {
        if (props.firstInput) {
            inputEl.current.focus();
        }
    }, [props.firstInput]);

    return (
        <div className="authentication__input-container">
            <label>
                <p className="authentication__input-title">{props.text}</p>
                <input
                    className="authentication__input"
                    type={props.type}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                    ref={inputEl}
                />
                <p className="authentication__input-error">{props.error}</p>
            </label>
        </div>
    );
};

export default Input;
