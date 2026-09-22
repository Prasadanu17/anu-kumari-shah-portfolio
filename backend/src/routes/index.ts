import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import educationRoutes from './education.routes';
import journeyRoutes from './journey.routes';
import skillRoutes from './skill.routes';
import projectRoutes from './project.routes';
import experienceRoutes from './experience.routes';
import certificationRoutes from './certification.routes';
import achievementRoutes from './achievement.routes';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/education', educationRoutes);
router.use('/journey', journeyRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/certifications', certificationRoutes);
router.use('/achievements', achievementRoutes);
router.use('/contact', contactRoutes);

export default router;