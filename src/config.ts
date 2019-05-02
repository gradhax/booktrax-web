const isProd = process.env.NODE_ENV === 'production';

export default {
  serverEndPoint: isProd ? 'https://booktrax-streamer.herokuapp.com' : 'http://localhost:4001',
};
