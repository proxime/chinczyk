import React from 'react';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

const override = css`
    display: block;
    margin: 0 auto;
`;

const RingSpinner = ({ size }) => {
    return (
        <div className="sweet-loading">
            <RingLoader css={override} size={size} color={'#ff8f00'} loading />
        </div>
    );
};

export default RingSpinner;
