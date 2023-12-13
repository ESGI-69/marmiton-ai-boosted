import { Router } from 'express';
import recipeController from '../controllers/recipe';
import ratingController from '../controllers/rating';
import { isLogged } from '../middlewares';

const router = Router();

router.get('/', recipeController.search);
router.get('/search', recipeController.search);
router.post('/generate', recipeController.searchAi);
router.get('/:id', recipeController.get);
router.post('/:id/ratings', isLogged, ratingController.addRating);
router.post('/:id/favorite', isLogged, recipeController.favorite);
router.post('/:id/unfavorite', isLogged, recipeController.unfavorite);

export default router;
