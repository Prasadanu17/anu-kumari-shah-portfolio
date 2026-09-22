import { Response } from 'express';

export class ApiResponse<T> {
  constructor(
    private statusCode: number,
    private data: T,
    private message: string = 'Success'
  ) {}

  send(res: Response): Response {
    return res.status(this.statusCode).json({
      success: this.statusCode < 400,
      message: this.message,
      data: this.data,
    });
  }
}