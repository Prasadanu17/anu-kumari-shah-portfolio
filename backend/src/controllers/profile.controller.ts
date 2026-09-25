import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getProfileStore, updateProfileStore } from '../services/dataStore';

export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await getProfileStore();
  new ApiResponse(200, profile).send(res);
});

export const upsertProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const updated = await updateProfileStore(req.body);
    new ApiResponse(200, updated, 'Profile saved').send(res);
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const updated = await updateProfileStore(req.body);
    new ApiResponse(200, updated, 'Profile updated').send(res);
  }
);