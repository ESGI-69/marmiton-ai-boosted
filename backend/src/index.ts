import express from 'express';

import errorHandler from './errorHandler';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import { populateUser } from './middlewares';

const app = express();
app.use(express.json());
app.use(populateUser);

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
