import { Router } from 'express';
import {
  getProfile,
  upsertProfile,
  updateProfile,
} from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateProfileSchema } from '../validators/schemas';

const router = Router();

router.get('/', getProfile);
router.post('/', authenticate, validate(updateProfileSchema), upsertProfile);
router.put('/', authenticate, validate(updateProfileSchema), updateProfile);

export default router;