import { Router } from 'express';
import {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  educationSchema,
  educationUpdateSchema,
} from '../validators/schemas';

const router = Router();

router.get('/', getEducation);
router.get('/:id', getEducationById);
router.post('/', authenticate, validate(educationSchema), createEducation);
router.put(
  '/:id',
  authenticate,
  validate(educationUpdateSchema),
  updateEducation
);
router.delete('/:id', authenticate, deleteEducation);

export default router;