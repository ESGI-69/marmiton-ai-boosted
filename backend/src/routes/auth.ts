import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.post('/login', userController.login);

export default router;
