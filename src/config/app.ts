import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import envHelpers from '../helpers/env';
import router from '../routers';
import validators from '../middlewares/validators';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan(envHelpers.isDev() ? 'dev' : 'combined'));

app.use(router);
app.use(validators.handleErrors);

export default app;
