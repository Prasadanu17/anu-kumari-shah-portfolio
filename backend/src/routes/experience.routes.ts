import { Router } from 'express';
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  experienceSchema,
  experienceUpdateSchema,
} from '../validators/schemas';

const router = Router();

router.get('/', getExperiences);
router.get('/:id', getExperienceById);
router.post('/', authenticate, validate(experienceSchema), createExperience);
router.put(
  '/:id',
  authenticate,
  validate(experienceUpdateSchema),
  updateExperience
);
router.delete('/:id', authenticate, deleteExperience);

export default router;