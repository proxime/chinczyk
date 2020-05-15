import io from 'socket.io-client';

// const client = '/';
const client = 'http://localhost:5000';

const socket = io.connect(client);

export default socket;
