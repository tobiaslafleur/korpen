import { ZodSchema } from 'zod';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import HTTPError from '~/lib/error';

const validateRequest = ({ schema }: FastifyRouteSchemaDef<ZodSchema>) => {
  return (data: unknown) => {
    const parsedData = schema.safeParse(data);

    if (parsedData.success) return true;

    const errorMessage = parsedData.error.issues
      .map(issue => issue.message)
      .join(', ');

    return {
      error: new HTTPError({ code: 'BAD_REQUEST', message: errorMessage }),
    };
  };
};

export default validateRequest;
