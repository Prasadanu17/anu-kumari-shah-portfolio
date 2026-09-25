import { Request, Response } from 'express';
import { SkillCategory } from '../models/SkillCategory.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getSkillsStore } from '../services/dataStore';

export const getSkills = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await getSkillsStore();
    new ApiResponse(200, items).send(res);
  }
);

export const getSkillById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await SkillCategory.findById(req.params.id);
    if (!item) throw ApiError.notFound('Skill category not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createSkill = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await SkillCategory.create(req.body);
    new ApiResponse(201, item, 'Skill category created').send(res);
  }
);

export const updateSkill = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await SkillCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) throw ApiError.notFound('Skill category not found');
    new ApiResponse(200, item, 'Skill category updated').send(res);
  }
);

export const deleteSkill = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Skill category not found');
    new ApiResponse(200, null, 'Skill category deleted').send(res);
  }
);