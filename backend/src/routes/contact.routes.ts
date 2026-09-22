import { Router } from 'express';
import {
  submitContact,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contact.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { contactLimiter } from '../middleware/rateLimit.middleware';
import { contactSchema } from '../validators/schemas';

const router = Router();

router.post('/', contactLimiter, validate(contactSchema), submitContact);
router.get('/', authenticate, getMessages);
router.patch('/:id/read', authenticate, markAsRead);
router.delete('/:id', authenticate, deleteMessage);

export default router;