import { Router } from 'express';
import recipeController from '../controllers/recipe';

const router = Router();

router.get('/:id', recipeController.get);

export default router;
