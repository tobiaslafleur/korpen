import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, ZodSchema } from 'zod';
import HTTPError from '~/lib/error';

type Schemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

const sanitizeRequest = (schemas: Schemas) => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const errorList = Array<ZodError>();

    const { body, params, query } = schemas;

    if (body) {
      const parsed = body.safeParse(request.body);

      if (parsed.success) {
        request.body = parsed.data;
      } else {
        errorList.push(parsed.error);
      }
    }

    if (query) {
      const parsed = query.safeParse(request.query);

      if (parsed.success) {
        request.query = parsed.data;
      } else {
        errorList.push(parsed.error);
      }
    }

    if (params) {
      const parsed = params.safeParse(request.params);

      if (parsed.success) {
        request.params = parsed.data;
      } else {
        errorList.push(parsed.error);
      }
    }

    if (errorList.length >= 1) {
      throw new HTTPError({
        code: 'BAD_REQUEST',
        message: zodErrorsToString(errorList),
      });
    }
  };
};

function zodErrorsToString(errors: Array<ZodError>) {
  const issues = errors.map(error => error.issues).flat();
  const message = issues.map(issue => issue.message).join(', ');

  return message;
}

export default sanitizeRequest;
