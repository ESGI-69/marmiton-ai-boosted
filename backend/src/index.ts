import express from 'express';

import errorHandler from './errorHandler';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import { populateUser } from './middlewares';
import recipes from './service/recipes';

const app = express();
app.use(express.json());
app.use(populateUser);

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(3000, async () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
  const recipe = await recipes.create({
    title: 'caca recette',
    description: 'desc',
    steps: ['prends le lait', 'boire le lait', 'caca'],
    ingredientsWithQuantities: [
      { name: 'caco', quantity: '1ml' },
      { name: 'lait', quantity: '2ml' },
    ],
  });
  console.log(JSON.stringify(recipe));
});
