import { Router } from 'express';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import recipeRouter from './routes/recipe';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);

export default router;
