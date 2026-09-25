import { Request, Response } from 'express';
import { Education } from '../models/Education.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getEducationStore } from '../services/dataStore';

export const getEducation = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await getEducationStore();
    new ApiResponse(200, items).send(res);
  }
);

export const getEducationById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Education.findById(req.params.id);
    if (!item) throw ApiError.notFound('Education not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Education.create(req.body);
    new ApiResponse(201, item, 'Education created').send(res);
  }
);

export const updateEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw ApiError.notFound('Education not found');
    new ApiResponse(200, item, 'Education updated').send(res);
  }
);

export const deleteEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Education not found');
    new ApiResponse(200, null, 'Education deleted').send(res);
  }
);