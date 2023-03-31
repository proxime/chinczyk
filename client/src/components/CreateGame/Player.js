import React from 'react';
import { useSelector } from 'react-redux';
import colors from '../../utils/colors';
import socket from '../../utils/socket';
import Spinner from '../Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Player = ({ color, player }) => {
    const gameId = useSelector((state) => state.game.gamePlayers);
    const userId = useSelector((state) => state.auth.userId);
    const isCreator = useSelector((state) => state.game.isCreator);

    const handleKickPlayer = () => {
        if (!gameId) return;
        socket.emit('kick', { gameId: gameId.id, playerId: player.key });
    };

    return (
        <div className="create-game__player">
            <div className="create-game__player-content">
                {player ? (
                    <>
                        <div className="create-game__player-waiting">
                            <FontAwesomeIcon
                                icon={faUser}
                                color={colors[color]}
                            />
                        </div>
                        <div className="create-game__player-name">
                            {player.login}
                        </div>
                        {userId !== player.key && isCreator && (
                            <div className="create-game__player-options">
                                <div
                                    className="create-game__player-option"
                                    onClick={handleKickPlayer}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Spinner size={100} />
                )}
            </div>
        </div>
    );
};

export default Player;
