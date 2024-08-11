import { describe, it, expect, vi } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../pages/api/hello';

const createMocks = () => {
  const req = {} as NextApiRequest;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as NextApiResponse;

  return { req, res };
};

describe('API Route Handler', () => {
  it('return JSON response with name "John Doe"', () => {
    const { req, res } = createMocks();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' });
  });
});
