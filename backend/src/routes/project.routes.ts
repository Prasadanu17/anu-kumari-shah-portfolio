import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { projectSchema, projectUpdateSchema } from '../validators/schemas';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', authenticate, validate(projectSchema), createProject);
router.put(
  '/:id',
  authenticate,
  validate(projectUpdateSchema),
  updateProject
);
router.delete('/:id', authenticate, deleteProject);

export default router;