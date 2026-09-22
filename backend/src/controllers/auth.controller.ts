import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw ApiError.unauthorized('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw ApiError.unauthorized('Invalid credentials');

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  new ApiResponse(
    200,
    {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
    },
    'Login successful'
  ).send(res);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw ApiError.conflict('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });

  new ApiResponse(
    201,
    { id: user.id, name: user.name, email: user.email },
    'Registration successful'
  ).send(res);
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  new ApiResponse(200, null, 'Logout successful').send(res);
});

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) throw ApiError.unauthorized('No refresh token');

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user) throw ApiError.unauthorized('User not found');

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    new ApiResponse(200, { accessToken }, 'Token refreshed').send(res);
  }
);

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id).select('-password');
  if (!user) throw ApiError.notFound('User not found');
  new ApiResponse(200, user).send(res);
});