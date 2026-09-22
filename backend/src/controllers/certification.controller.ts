import { Request, Response } from 'express';
import { Certification } from '../models/Certification.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getCertifications = asyncHandler(
  async (_req: Request, res: Response) => {
    const items = await Certification.find().sort({ order: 1, createdAt: 1 });
    new ApiResponse(200, items).send(res);
  }
);

export const getCertificationById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Certification.findById(req.params.id);
    if (!item) throw ApiError.notFound('Certification not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createCertification = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Certification.create(req.body);
    new ApiResponse(201, item, 'Certification created').send(res);
  }
);

export const updateCertification = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) throw ApiError.notFound('Certification not found');
    new ApiResponse(200, item, 'Certification updated').send(res);
  }
);

export const deleteCertification = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Certification.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Certification not found');
    new ApiResponse(200, null, 'Certification deleted').send(res);
  }
);