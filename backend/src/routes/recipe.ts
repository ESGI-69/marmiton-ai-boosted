import { Router } from 'express';
import recipeController from '../controllers/recipe';
import ratingController from '../controllers/rating';
import { isLogged } from '../middlewares';

const router = Router();

router.get('/', recipeController.search);
router.get('/search', recipeController.search);
router.post('/generate', recipeController.generate);
router.get('/:id', recipeController.get);
router.get('/:id/suggest/recipies', recipeController.suggestRecipies);
router.get('/:id/suggest/wine', recipeController.getWine);
router.get('/:id/suggest/cheese', recipeController.getCheese);
router.get('/:id/suggest/dessert', recipeController.getDessert);
router.post('/:id/ratings', isLogged, ratingController.addRating);
router.post('/:id/favorite', isLogged, recipeController.favorite);
router.post('/:id/unfavorite', isLogged, recipeController.unfavorite);

export default router;
