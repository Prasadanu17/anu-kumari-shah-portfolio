import { Request, Response } from 'express';
import { Profile } from '../models/Profile.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await Profile.findOne();
  new ApiResponse(200, profile).send(res);
});

export const upsertProfile = asyncHandler(
  async (req: Request, res: Response) => {
    let profile = await Profile.findOne();

    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      profile = await Profile.create(req.body);
    }

    new ApiResponse(200, profile, 'Profile saved').send(res);
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await Profile.findOne();
    if (!profile) throw ApiError.notFound('Profile not found');

    const updated = await Profile.findByIdAndUpdate(profile._id, req.body, {
      new: true,
      runValidators: true,
    });

    new ApiResponse(200, updated, 'Profile updated').send(res);
  }
);