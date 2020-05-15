import React from 'react';
import { useSelector } from 'react-redux';
import colors from '../../utils/colors';
import socket from '../../utils/socket';
import Spinner from '../Spinner';

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
                            <i
                                className="far fa-user"
                                style={{ color: colors[color] }}
                            ></i>
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
                                    <i className="fas fa-times"></i>
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
