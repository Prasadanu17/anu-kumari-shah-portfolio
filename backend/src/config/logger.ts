import { env } from './env';

export const logger = {
  info: (msg: string, ...args: unknown[]): void => {
    if (env.NODE_ENV !== 'test') {
      console.log(`[INFO] ${msg}`, ...args);
    }
  },
  error: (msg: string, ...args: unknown[]): void => {
    console.error(`[ERROR] ${msg}`, ...args);
  },
  warn: (msg: string, ...args: unknown[]): void => {
    console.warn(`[WARN] ${msg}`, ...args);
  },
  success: (msg: string, ...args: unknown[]): void => {
    if (env.NODE_ENV !== 'test') {
      console.log(`[SUCCESS] ${msg}`, ...args);
    }
  },
};