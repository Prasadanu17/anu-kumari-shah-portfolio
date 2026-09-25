import { Request, Response } from 'express';
import { Project } from '../models/Project.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getProjectsStore } from '../services/dataStore';

export const getProjects = asyncHandler(
  async (req: Request, res: Response) => {
    let items: any[] = await getProjectsStore();
    const { category, isProminent } = req.query;

    if (category) {
      items = items.filter((i: any) => i.category === category);
    }
    if (isProminent !== undefined) {
      const boolProm = isProminent === 'true';
      items = items.filter((i: any) => i.isProminent === boolProm);
    }

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