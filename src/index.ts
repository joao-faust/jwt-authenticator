import './config/env';
import app from './config/app';
import envHelpers from './helpers/env';
import db from './config/storage/db';

const APP_PORT = envHelpers.getVariable('APP_PORT');

(async () => {
  try {
    await db.connect();

    app.listen(APP_PORT, () => {
      console.log('The server is running on port:', APP_PORT);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('MongoDB client error', err.message);
    }
  }
})();
