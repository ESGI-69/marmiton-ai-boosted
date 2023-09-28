import { Router } from 'express';
import searchController from '../controllers/search';

const router = Router();
console.log('test route');
router.post('/', searchController.post);

export default router;
