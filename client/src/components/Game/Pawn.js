import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';

import blue from '../../images/blue.png';
import green from '../../images/green.png';
import red from '../../images/red.png';
import yellow from '../../images/yellow.png';

const pawns = [blue, yellow, red, green];

const Pawn = ({ player, number, value }) => {
    const pawnValue = useRef(value);
    const userId = useSelector((state) => state.auth.userId);
    const canMove = useSelector((state) => state.game.canMove);
    const dissconnected = useSelector((state) => state.game.dissconnect);

    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    });

    const getCurrentPosition = useCallback(() => {
        if (pawnValue.current === 0) {
            const item = document.querySelector(
                `.area-${player.number} .area__item:nth-child(${
                    Number(number) + 1
                }) .area__center`
            );

            setPos({
                x:
                    item.offsetLeft +
                    item.parentElement.parentElement.offsetLeft +
                    item.parentElement.parentElement.parentElement.offsetLeft +
                    item.offsetWidth / 2,
                y:
                    item.offsetTop +
                    item.parentElement.parentElement.offsetTop +
                    item.parentElement.parentElement.parentElement.offsetTop,
            });
        } else if (!Number(pawnValue.current)) {
            const item = document.querySelector(
                `.fields-${player.number} .field-${pawnValue.current}`
            );

            setPos({
                x: item.offsetLeft + item.offsetWidth / 2 + 7.025,
                y: item.offsetTop - 3,
            });
        } else {
            const item = document.querySelector(`.field-${pawnValue.current}`);

            setPos({
                x: item.offsetLeft + item.offsetWidth / 2 + 7.025,
                y: item.offsetTop - 3,
            });
        }
    }, [pawnValue, number, player.number]);

    useEffect(() => {
        if (value > 51) {
            const newValue = value - 52;
            pawnValue.current = `end-${newValue}`;
        } else if (value !== 0) {
            if (player.number === 0) {
                pawnValue.current = value;
            } else {
                if (value <= 52 - player.number * 13) {
                    pawnValue.current = value + player.number * 13;
                } else {
                    pawnValue.current = value - (52 - player.number * 13);
                }
            }
        } else {
            pawnValue.current = 0;
        }
        getCurrentPosition();
    }, [value, getCurrentPosition, player]);

    useEffect(() => {
        window.addEventListener('resize', getCurrentPosition);

        return () => {
            window.removeEventListener('resize', getCurrentPosition);
        };
    }, [getCurrentPosition]);

    const handlePawnMove = () => {
        if (
            userId === player.id &&
            canMove[number] === true &&
            dissconnected.length === 0
        ) {
            socket.emit('pawnMove', number);
        }
    };

    return (
        <div
            className={`pawns__pawn ${
                userId === player.id &&
                canMove[number] === true &&
                dissconnected.length === 0
                    ? 'pawns__move'
                    : ''
            }`}
            onClick={handlePawnMove}
            style={{
                left: pos.x + 'px',
                top: pos.y + 'px',
            }}
        >
            <img src={pawns[player.number]} alt="" />
        </div>
    );
};

export default Pawn;
