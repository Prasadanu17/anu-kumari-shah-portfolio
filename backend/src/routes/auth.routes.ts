import { Router } from 'express';
import {
  login,
  register,
  logout,
  refreshAccessToken,
  getMe,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimit.middleware';
import { loginSchema, registerSchema } from '../validators/schemas';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);
router.get('/me', authenticate, getMe);

export default router;