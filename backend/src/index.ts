import express from 'express';

import errorHandler from './errorHandler';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import recipeRouter from './routes/recipe';
import searchRouter from './routes/search';
import { populateUser } from './middlewares';

const app = express();
app.use(express.json());
app.use(populateUser);

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/recipes', recipeRouter);

app.use('/search', searchRouter);
console.log('test index');
app.use(errorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
