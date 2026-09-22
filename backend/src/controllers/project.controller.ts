import { Request, Response } from 'express';
import { Project } from '../models/Project.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const { category, isProminent } = req.query;

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (isProminent !== undefined) filter.isProminent = isProminent === 'true';

    const items = await Project.find(filter).sort({ order: 1, createdAt: 1 });
    new ApiResponse(200, items).send(res);
  }
);

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Project.findById(req.params.id);
    if (!item) throw ApiError.notFound('Project not found');
    new ApiResponse(200, item).send(res);
  }
);

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Project.create(req.body);
    new ApiResponse(201, item, 'Project created').send(res);
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw ApiError.notFound('Project not found');
    new ApiResponse(200, item, 'Project updated').send(res);
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Project not found');
    new ApiResponse(200, null, 'Project deleted').send(res);
  }
);