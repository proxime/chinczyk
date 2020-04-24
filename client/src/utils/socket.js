import io from 'socket.io-client';

const production = '/';
// const dev = 'http://localhost:5000';

const socket = io.connect(production);

export default socket;
