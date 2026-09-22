import { Router } from 'express';
import {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certification.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  certificationSchema,
  certificationUpdateSchema,
} from '../validators/schemas';

const router = Router();

router.get('/', getCertifications);
router.get('/:id', getCertificationById);
router.post(
  '/',
  authenticate,
  validate(certificationSchema),
  createCertification
);
router.put(
  '/:id',
  authenticate,
  validate(certificationUpdateSchema),
  updateCertification
);
router.delete('/:id', authenticate, deleteCertification);

export default router;