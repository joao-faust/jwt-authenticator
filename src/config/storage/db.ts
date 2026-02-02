import mongoose from 'mongoose';
import envHelpers from '../../helpers/env';

mongoose.connection.on('connected', () => {
  console.log('MongoDB client is ready');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB client error', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB client');
});

async function connect(): Promise<void> {
  const DB_HOST = envHelpers.getVariable('DB_HOST');
  const DB_PORT = envHelpers.getVariable('DB_PORT');
  const DB_NAME = envHelpers.getVariable('DB_NAME');

  const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  await mongoose.connect(uri);
}

export default {
  connect,
};
