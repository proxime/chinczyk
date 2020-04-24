import React from 'react';
import { css } from '@emotion/core';
import CircleLoader from 'react-spinners/CircleLoader';

const override = css`
    display: block;
    margin: 30px auto;
`;

const Spinner = ({ size }) => {
    return (
        <div className="sweet-loading">
            <CircleLoader
                css={override}
                size={size}
                color={'#ff8f00'}
                loading
            />
        </div>
    );
};

export default Spinner;
