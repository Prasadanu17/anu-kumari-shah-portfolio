import { Router } from 'express';
import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievement.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  achievementSchema,
  achievementUpdateSchema,
} from '../validators/schemas';

const router = Router();

router.get('/', getAchievements);
router.get('/:id', getAchievementById);
router.post('/', authenticate, validate(achievementSchema), createAchievement);
router.put(
  '/:id',
  authenticate,
  validate(achievementUpdateSchema),
  updateAchievement
);
router.delete('/:id', authenticate, deleteAchievement);

export default router;