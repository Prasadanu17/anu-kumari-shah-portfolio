import { Router } from 'express';
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skill.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  skillCategorySchema,
  skillCategoryUpdateSchema,
} from '../validators/schemas';

const router = Router();

router.get('/', getSkills);
router.get('/:id', getSkillById);
router.post('/', authenticate, validate(skillCategorySchema), createSkill);
router.put(
  '/:id',
  authenticate,
  validate(skillCategoryUpdateSchema),
  updateSkill
);
router.delete('/:id', authenticate, deleteSkill);

export default router;