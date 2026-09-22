import { z } from 'zod';

// ============ AUTH ============
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

// ============ PROFILE ============
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    title: z.string().min(2).optional(),
    tagline: z.string().optional(),
    email: z.string().email().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    resume: z.string().optional(),
    heroHighlights: z.array(z.string()).optional(),
    currentlyExploring: z.array(z.string()).optional(),
  }),
});

// ============ EDUCATION ============
export const educationSchema = z.object({
  body: z.object({
    degree: z.string().min(2),
    institution: z.string().min(2),
    period: z.string().min(2),
    cgpa: z.string().optional().default(''),
    description: z.string().optional().default(''),
    order: z.number().int().optional().default(0),
  }),
});

export const educationUpdateSchema = z.object({
  body: z.object({
    degree: z.string().min(2).optional(),
    institution: z.string().min(2).optional(),
    period: z.string().min(2).optional(),
    cgpa: z.string().optional(),
    description: z.string().optional(),
    order: z.number().int().optional(),
  }),
});

// ============ JOURNEY ============
export const journeySchema = z.object({
  body: z.object({
    title: z.string().min(2),
    subtitle: z.string().optional().default(''),
    period: z.string().min(2),
    description: z.string().min(2),
    order: z.number().int().optional().default(0),
  }),
});

export const journeyUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    subtitle: z.string().optional(),
    period: z.string().min(2).optional(),
    description: z.string().min(2).optional(),
    order: z.number().int().optional(),
  }),
});

// ============ SKILL CATEGORY ============
export const skillCategorySchema = z.object({
  body: z.object({
    category: z.string().min(2),
    description: z.string().optional().default(''),
    skills: z.array(z.string()).optional().default([]),
    order: z.number().int().optional().default(0),
  }),
});

export const skillCategoryUpdateSchema = z.object({
  body: z.object({
    category: z.string().min(2).optional(),
    description: z.string().optional(),
    skills: z.array(z.string()).optional(),
    order: z.number().int().optional(),
  }),
});

// ============ PROJECT ============
export const projectSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(200),
    category: z.enum(['ai_ml', 'web']),
    isProminent: z.boolean().optional().default(false),
    tag: z.string().optional().default(''),
    description: z.string().min(10),
    technologies: z.array(z.string()).optional().default([]),
    image: z.string().optional().default(''),
    demo: z.string().optional().default(''),
    github: z.string().optional().default(''),
    keyFeatures: z.array(z.string()).optional().default([]),
    order: z.number().int().optional().default(0),
  }),
});

export const projectUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(200).optional(),
    category: z.enum(['ai_ml', 'web']).optional(),
    isProminent: z.boolean().optional(),
    tag: z.string().optional(),
    description: z.string().min(10).optional(),
    technologies: z.array(z.string()).optional(),
    image: z.string().optional(),
    demo: z.string().optional(),
    github: z.string().optional(),
    keyFeatures: z.array(z.string()).optional(),
    order: z.number().int().optional(),
  }),
});

// ============ EXPERIENCE ============
export const experienceSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    company: z.string().min(2),
    location: z.string().optional().default(''),
    period: z.string().min(2),
    type: z.string().optional().default(''),
    highlights: z.array(z.string()).optional().default([]),
    technologies: z.array(z.string()).optional().default([]),
    projectsMentioned: z.array(z.string()).optional().default([]),
    order: z.number().int().optional().default(0),
  }),
});

export const experienceUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    company: z.string().min(2).optional(),
    location: z.string().optional(),
    period: z.string().min(2).optional(),
    type: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    projectsMentioned: z.array(z.string()).optional(),
    order: z.number().int().optional(),
  }),
});

// ============ CERTIFICATION ============
export const certificationSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    organization: z.string().min(2),
    date: z.string().min(2),
    category: z.string().optional().default(''),
    credentialId: z.string().optional().default(''),
    skills: z.array(z.string()).optional().default([]),
    description: z.string().optional().default(''),
    link: z.string().nullable().optional().default(null),
    order: z.number().int().optional().default(0),
  }),
});

export const certificationUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    organization: z.string().min(2).optional(),
    date: z.string().min(2).optional(),
    category: z.string().optional(),
    credentialId: z.string().optional(),
    skills: z.array(z.string()).optional(),
    description: z.string().optional(),
    link: z.string().nullable().optional(),
    order: z.number().int().optional(),
  }),
});

// ============ ACHIEVEMENT ============
export const achievementSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    category: z.string().optional().default(''),
    description: z.string().min(2),
    icon: z.enum(['award', 'code', 'heart']).optional().default('award'),
    order: z.number().int().optional().default(0),
  }),
});

export const achievementUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    category: z.string().optional(),
    description: z.string().min(2).optional(),
    icon: z.enum(['award', 'code', 'heart']).optional(),
    order: z.number().int().optional(),
  }),
});

// ============ CONTACT ============
export const contactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required').max(100),
    email: z.string().email('Invalid email'),
    message: z
      .string()
      .min(10, 'Message must be at least 10 characters')
      .max(5000),
  }),
});