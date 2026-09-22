import { Request, Response } from 'express';
import { Achievement } from '../models/Achievement.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getAchievements = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await Achievement.find().sort({ order: 1, createdAt: 1 });
    new ApiResponse(200, items).send(res);
  }
);

export const getAchievementById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Achievement.findById(req.params.id);
    if (!item) throw ApiError.notFound('Achievement not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Achievement.create(req.body);
    new ApiResponse(201, item, 'Achievement created').send(res);
  }
);

export const updateAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw ApiError.notFound('Achievement not found');
    new ApiResponse(200, item, 'Achievement updated').send(res);
  }
);

export const deleteAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Achievement.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Achievement not found');
    new ApiResponse(200, null, 'Achievement deleted').send(res);
  }
);