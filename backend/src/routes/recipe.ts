import { Router } from 'express';
import recipeController from '../controllers/recipe';
import ratingController from '../controllers/rating';
import { isLogged } from '../middlewares';

const router = Router();

router.get('/', recipeController.search);
router.get('/:id', recipeController.get);
router.post('/:id/ratings', isLogged, ratingController.addRating);
router.post('/search', recipeController.search);

export default router;
