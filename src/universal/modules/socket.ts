import config from '@@config';

const state = {
  error: false,
  socket: null,
};

export async function init() {
  const { serverEndPoint } = config;
  console.log('socket.init(): initializing socket, endpoint: %s/', serverEndPoint);

  return new Promise((resolve, reject) => {
    let isResolved = false;
    try {
      const socket = io.connect(`${serverEndPoint}`);

      socket.on('connection', () => {
        console.log('socket.init(): connection success');
      });

      socket.on('connection-result', ({ socketId, origin }) => {
        console.log('socket.init(): socketId: %s, origin: %s', socketId, origin);
        if (!isResolved) {
          resolve(socketId);
          isResolved = true;
        }
      });
      state.socket = socket;
    } catch (err) {
      state.error = true;
      reject(err);
    }
  })
}

export function getSocket() {
  if (state.error) {
    throw new Error('socket.getSocket(): socket is not found. Error has occurred');
  }
  return state['socket'] as any;
}
