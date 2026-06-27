import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getProperties, getPropertyById, createProperty } from '../controllers/propertyController';

const router = Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', authenticateToken, createProperty);

export default router;
