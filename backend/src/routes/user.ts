import { Router } from 'express';
import userController from '../controllers/user';
import { isLogged } from '../middlewares';

const router = Router();

router.post('/', userController.post);
router.get('/me', isLogged, userController.me);
router.post('/me/allergies', userController.addAllergy);
router.delete('/me/allergies/:name', userController.deleteAllergy);

export default router;
