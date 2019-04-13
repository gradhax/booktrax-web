const isDev = process.env.NODE_ENV === 'development';

export default {
  dbEndPoint: isDev ? 'http://localhost:4123' : 'http://35.236.58.190:4123',
};
