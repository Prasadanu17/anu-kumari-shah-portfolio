import { Request, Response } from 'express';
import { Experience } from '../models/Experience.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getExperienceStore } from '../services/dataStore';

export const getExperiences = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await getExperienceStore();
    new ApiResponse(200, items).send(res);
  }
);

export const getExperienceById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Experience.findById(req.params.id);
    if (!item) throw ApiError.notFound('Experience not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Experience.create(req.body);
    new ApiResponse(201, item, 'Experience created').send(res);
  }
);

export const updateExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw ApiError.notFound('Experience not found');
    new ApiResponse(200, item, 'Experience updated').send(res);
  }
);

export const deleteExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Experience not found');
    new ApiResponse(200, null, 'Experience deleted').send(res);
  }
);