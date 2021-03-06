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
        console.log('[socket] connection: connection success');
      });

      socket.on('response-connection', ({ socketId, origin }) => {
        console.log('[socket] response-connection: socketId: %s, requestOrigin: %s', socketId, origin);
        if (!isResolved) {
          resolve(socketId);
          isResolved = true;
        }
      });

      socket.on('debug', msg => {
        console.log('[socket] debug: %s', msg);
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
