import express, { Router } from 'express';
import BlogCRUD from '../controllers/blogCRUD.controller';

const router: Router = express.Router();

router.get('/all',BlogCRUD.fetchAll);
router.post('/', BlogCRUD.create);
router.get('/:id', BlogCRUD.fetch);
router.delete('/:id',BlogCRUD.delete);
router.put('/:id',BlogCRUD.update);

export default router;
