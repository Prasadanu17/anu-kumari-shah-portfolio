import { Router } from 'express';
import {
  getJourneys,
  getJourneyById,
  createJourney,
  updateJourney,
  deleteJourney,
} from '../controllers/journey.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { journeySchema, journeyUpdateSchema } from '../validators/schemas';

const router = Router();

router.get('/', getJourneys);
router.get('/:id', getJourneyById);
router.post('/', authenticate, validate(journeySchema), createJourney);
router.put('/:id', authenticate, validate(journeyUpdateSchema), updateJourney);
router.delete('/:id', authenticate, deleteJourney);

export default router;