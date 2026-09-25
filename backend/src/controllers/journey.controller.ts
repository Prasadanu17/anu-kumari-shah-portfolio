import { Request, Response } from 'express';
import { Journey } from '../models/Journey.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getJourneyStore } from '../services/dataStore';

export const getJourneys = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await getJourneyStore();
    new ApiResponse(200, items).send(res);
  }
);

export const getJourneyById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Journey.findById(req.params.id);
    if (!item) throw ApiError.notFound('Journey not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createJourney = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Journey.create(req.body);
    new ApiResponse(201, item, 'Journey created').send(res);
  }
);

export const updateJourney = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Journey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw ApiError.notFound('Journey not found');
    new ApiResponse(200, item, 'Journey updated').send(res);
  }
);

export const deleteJourney = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Journey.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Journey not found');
    new ApiResponse(200, null, 'Journey deleted').send(res);
  }
);