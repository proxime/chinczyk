const express = require('express');
const app = express();
const server = require('http').createServer(app);
const connectDB = require('./config/db');
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));

const users = {};
const usersList = {};
const games = {};

const logoutOrDisconnect = (socket) => {
    const gameId = users[socket.id].game;
    if (gameId) {
        const game = games[gameId];
        if (!game) return;

        if (!game.started) {
            if (game.creator === socket.id) {
                socket.broadcast.to(gameId).emit('kick');
                game.players.forEach((player) => {
                    if (player.key !== socket.id) {
                        users[player.key].game = null;
                        users[player.key].socket.leave(gameId);
                        usersList[player.key] = player.login;
                    }
                });
                delete games[gameId];
            } else {
                const removeIndex = game.players.findIndex(
                    (player) => player.key === socket.id
                );
                game.players.splice(removeIndex, 1);
                games[gameId] = game;
                socket.broadcast.to(gameId).emit('join', game);
                socket.broadcast
                    .to(gameId)
                    .emit(
                        'chatInfo',
                        `Użytkownik ${users[socket.id].login} opuścił grę`
                    );
            }
        }
    }
    delete users[socket.id];
    delete usersList[socket.id];
};

io.on('connection', (socket) => {
    socket.on('login', (credentials) => {
        const { id, login } = credentials;
        // check if user is already log in
        let isLogin = false;
        for (const key in users) {
            if (users[key].id === id) {
                isLogin = true;
                socket.emit('isLogin', isLogin);
                break;
            }
        }
        if (isLogin) return;
        socket.emit('isLogin', socket.id);
        users[socket.id] = {
            id,
            login,
            socket,
            game: null,
        };
        usersList[socket.id] = login;
    });
    socket.on('logout', () => {
        logoutOrDisconnect(socket);
    });
    socket.on('createGame', () => {
        const gameId = uuidv4();
        const creator = socket;
        users[creator.id].game = gameId;
        const game = {
            id: gameId,
            creator: creator.id,
            started: false,
            board: {},
            diceHistory: [],
            turn: null,
            players: [
                {
                    key: creator.id,
                    login: users[creator.id].login,
                },
            ],
        };
        games[gameId] = game;
        creator.join(gameId);
        delete usersList[creator.id];
        creator.emit('join', game);
        creator.emit('getPlayersList', usersList);
        socket.emit('chatInfo', `Poczekalnia została pomyślnie utworzona`);
    });
    socket.on('invitePlayer', (playerId) => {
        const user = users[socket.id];
        if (!user || !user.game) {
            socket.emit('err');
            return;
        }
        const game = games[user.game];
        if (game.creator !== socket.id) {
            socket.emit('err');
            return;
        }
        if (!usersList[playerId]) {
            socket.emit('playerNotFound', usersList);
            return;
        }
        users[playerId].socket.emit('inviteToGame', {
            id: user.game,
            inviter: user.login,
        });
    });
    socket.on('refreshPlayersList', () => {
        socket.emit('getPlayersList', usersList);
    });
    socket.on('acceptInvite', (gameId) => {
        if (!usersList[socket.id]) {
            socket.emit('err');
            return;
        }
        if (!games[gameId] || games[gameId].players.length === 4) {
            socket.emit('gameNotFound');
            return;
        }
        delete usersList[socket.id];
        socket.join(gameId);
        const user = users[socket.id];
        user.game = gameId;
        games[gameId].players.push({
            key: socket.id,
            login: user.login,
        });

        io.to(gameId).emit('join', games[gameId]);
        users[games[gameId].creator].socket.emit('getPlayersList', usersList);
        io.to(gameId).emit(
            'chatInfo',
            `Użytkownik ${user.login} dołączył do gry`
        );
    });
    socket.on('kick', (request) => {
        const { gameId, playerId } = request;
        const game = games[gameId];
        if (!game || !users[playerId] || socket.id !== game.creator) {
            socket.emit('err');
            return;
        }
        const removeIndex = game.players.findIndex(
            (player) => player.key === playerId
        );
        if (removeIndex === -1) {
            creator.emit('playerNotFound', usersList);
            return;
        }
        const user = game.players.splice(removeIndex, 1);
        games[gameId] = game;
        io.to(gameId).emit('join', game);
        users[playerId].game = null;
        users[playerId].socket.emit('kick');
        users[playerId].socket.leave(gameId);
        usersList[playerId] = user[0].login;
        io.to(gameId).emit(
            'chatInfo',
            `Użytkownik ${user[0].login} został wyrzucony`
        );
    });
    socket.on('removeGame', (gameId) => {
        const game = games[gameId];
        if (!game || socket.id !== game.creator) {
            socket.emit('err');
            return;
        }
        socket.broadcast.to(gameId).emit('kick');
        game.players.forEach((player) => {
            users[player.key].game = null;
            users[player.key].socket.leave(gameId);
            usersList[player.key] = player.login;
        });
        socket.emit('removeGame');
        delete games[gameId];
    });
    socket.on('escapeFromGame', () => {
        const gameId = users[socket.id].game;
        const game = games[gameId];
        if (!game) {
            socket.emit('err');
            return;
        }
        const user = users[socket.id];
        usersList[socket.id] = user.login;
        const removeIndex = game.players.findIndex(
            (player) => player.key === socket.id
        );
        game.players.splice(removeIndex, 1);
        games[gameId] = game;
        users[socket.id].game = null;
        socket.broadcast.to(gameId).emit('join', game);
        user.socket.leave(gameId);
        io.to(gameId).emit('chatInfo', `Użytkownik ${user.login} opuścił grę`);
    });
    socket.on('startGame', (gameId) => {
        const game = games[gameId];
        if (!game) {
            socket.emit('err');
            return;
        }
        game.started = true;
        game.turn = game.players[0].key;
        game.players.forEach((player, index) => {
            game.board[player.key] = {
                id: player.key,
                number: index,
                pawns: {
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0,
                },
            };
        });
        game.canMove = {
            0: false,
            1: false,
            2: false,
            3: false,
        };
        games[gameId] = game;
        io.to(gameId).emit('startGame', game);
        io.to(gameId).emit('chatInfo', 'Rozpoczęcie gry!');
    });
    socket.on('chat', (msg) => {
        const user = users[socket.id];
        if (!user) return;
        const gameId = games[user.game].id;
        socket.broadcast.to(gameId).emit('chat', { user: socket.id, msg });
    });
    socket.on('chatInfo', (msg) => {
        const user = users[socket.id];
        if (!user) return;
        const gameId = games[user.game].id;
        socket.broadcast.to(gameId).emit('chatInfo', msg);
    });
    socket.on('randomNumber', () => {
        const user = users[socket.id];
        if (!user) return;
        const game = games[user.game];
        if (!game || game.turn !== socket.id) {
            socket.emit('err');
            return;
        }
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        games[user.game].diceHistory.unshift(randomNumber);
        const playerPawns = game.board[socket.id].pawns;
        const canMove = {
            0: false,
            1: false,
            2: false,
            3: false,
        };
        for (const key in playerPawns) {
            if (playerPawns[key] === 0) {
                if (randomNumber === 6) {
                    canMove[key] = true;
                }
            } else {
                if (playerPawns[key] + randomNumber <= 57) {
                    canMove[key] = true;
                }
            }
        }
        games[user.game].canMove = canMove;
        socket.emit('randomNumber', { randomNumber, canMove });
        if (!canMove[0] && !canMove[1] && !canMove[2] && !canMove[3]) {
            setTimeout(() => {
                let turn = game.players.findIndex(
                    (player) => player.key === game.turn
                );
                if (turn === game.players.length - 1) turn = 0;
                else turn++;
                const playerTurn = game.players[turn].key;
                games[user.game].turn = playerTurn;
                io.to(game.id).emit('nextTurn', playerTurn);
            }, 1000);
        }
    });
    socket.on('pawnMove', (number) => {
        const user = users[socket.id];
        if (!user) return;
        const game = games[user.game];
        if (!game || game.turn !== socket.id) {
            socket.emit('err');
            return;
        }
        if (!game.canMove[number]) return;
        let pawn = game.board[socket.id].pawns[number];
        if (pawn === 0) {
            pawn = 1;
        } else {
            pawn += game.diceHistory[0];
        }
        games[user.game].board[socket.id].pawns[number] = pawn;

        // Check if any pawn is on the same position
        let translatedPawn = pawn;
        if (translatedPawn !== 0 && translatedPawn <= 51) {
            if (translatedPawn <= 52 - game.board[socket.id].number * 13) {
                translatedPawn =
                    translatedPawn + game.board[socket.id].number * 13;
            } else {
                translatedPawn =
                    translatedPawn - (52 - game.board[socket.id].number * 13);
            }

            for (const key in game.board) {
                if (key === socket.id) continue;
                for (const i in game.board[key].pawns) {
                    let value = game.board[key].pawns[i];
                    if (value !== 0 && value <= 51) {
                        if (value <= 52 - game.board[key].number * 13) {
                            value = value + game.board[key].number * 13;
                        } else {
                            value = value - (52 - game.board[key].number * 13);
                        }

                        if (value === translatedPawn)
                            games[user.game].board[key].pawns[i] = 0;
                    }
                }
            }
        }

        io.to(game.id).emit('pawnMove', games[user.game].board);
        games[user.game].canMove = {
            0: false,
            1: false,
            2: false,
            3: false,
        };
        setTimeout(() => {
            let turn = game.players.findIndex(
                (player) => player.key === game.turn
            );
            if (game.diceHistory[0] !== 6 && pawn !== 57) {
                if (turn === game.players.length - 1) turn = 0;
                else turn++;
            }
            const playerTurn = game.players[turn].key;
            games[user.game].turn = playerTurn;
            io.to(game.id).emit('nextTurn', playerTurn);
        }, 300);
    });
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            logoutOrDisconnect(socket);
        }
    });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
