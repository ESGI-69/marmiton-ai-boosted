import { Router } from 'express';
import userController from '../controllers/user';
import { isLogged } from '../middlewares';

const router = Router();

router.post('/', userController.post);
router.get('/me', isLogged, userController.me);
router.post('/me/allergies', isLogged, userController.addAllergy);
router.delete('/me/allergies/:name', isLogged, userController.deleteAllergy);
router.post('/me/non-liked-ingredients', isLogged, userController.addNonLikedIngredient);
router.delete('/me/non-liked-ingredients/:name', isLogged, userController.deleteNonLikedIngredient);

export default router;
