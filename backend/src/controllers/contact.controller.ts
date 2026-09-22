import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { sendContactEmail } from '../services/email.service';

export const submitContact = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    const contact = await ContactMessage.create({ name, email, message });

    // Send email notification (don't fail the request if it errors)
    try {
      await sendContactEmail({ name, email, message });
    } catch (err) {
      console.error('Email send failed:', err);
    }

    new ApiResponse(
      201,
      { id: contact._id },
      'Message received. I will get back to you soon!'
    ).send(res);
  }
);

export const getMessages = asyncHandler(
  async (_req: Request, res: Response) => {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    new ApiResponse(200, messages).send(res);
  }
);

export const markAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) throw ApiError.notFound('Message not found');
    new ApiResponse(200, msg, 'Marked as read').send(res);
  }
);

export const deleteMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) throw ApiError.notFound('Message not found');
    new ApiResponse(200, null, 'Message deleted').send(res);
  }
);