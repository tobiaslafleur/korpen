import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

type HTTPErrorProps = {
  message?: string;
  code: keyof typeof STATUS_CODES;
};

export default class HTTPError extends Error {
  public readonly message: string;
  public readonly code: keyof typeof STATUS_CODES;
  public readonly statusCode: number;
  public readonly error: string;

  constructor({ message, code }: HTTPErrorProps) {
    super(message);

    this.message = message || 'Something went wrong';
    this.code = code;
    this.statusCode = STATUS_CODES[code];
    this.error = STATUS_CODE_MESSAGE[code];
  }
}

const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const STATUS_CODE_MESSAGE = {
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  TIMEOUT: 'Timeout',
  CONFLICT: 'Conflict',
  TOO_MANY_REQUESTS: 'Too many requests',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof HTTPError) {
    return reply.status(error.statusCode).send({
      timestamp: Date.now(),
      status: error.statusCode,
      error: error.code,
      message: error.message,
      path: request.url,
    });
  }

  return reply.status(STATUS_CODES['INTERNAL_SERVER_ERROR']).send({
    timestamp: Date.now(),
    status: STATUS_CODES['INTERNAL_SERVER_ERROR'],
    error: STATUS_CODE_MESSAGE['INTERNAL_SERVER_ERROR'],
    message: 'Something went wrong',
    path: request.url,
  });
};

export const notFoundHandler = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.status(STATUS_CODES['NOT_FOUND']).send({
    timestamp: Date.now(),
    status: STATUS_CODES['NOT_FOUND'],
    error: STATUS_CODE_MESSAGE['NOT_FOUND'],
    message: 'Resource not found',
    path: request.url,
  });
};
