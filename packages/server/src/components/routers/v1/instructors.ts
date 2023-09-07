import { FastifyInstance } from 'fastify';
import * as instructorsController from '~/components/controllers/instructors';
import { paramsIdSchema } from '~/components/schemas/common';
import * as instructorsSchemas from '~/components/schemas/instructors';

const instructorsRouteHandler = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      preHandler: [
        server.authenticate,
        server.sanitizeRequest({
          body: instructorsSchemas.createInstructorSchema,
        }),
      ],
      schema: {
        body: instructorsSchemas.createInstructorSchema,
      },
    },
    instructorsController.createInstructor
  );

  server.get('/', instructorsController.getInstructors);

  server.get(
    '/:id',
    {
      preHandler: [server.sanitizeRequest({ params: paramsIdSchema })],
      schema: {
        params: paramsIdSchema,
      },
    },
    instructorsController.getInstructorById
  );

  server.patch(
    '/:id',
    {
      preHandler: [
        server.authenticate,
        server.sanitizeRequest({
          params: paramsIdSchema,
          body: instructorsSchemas.updateInstructorSchema,
        }),
      ],
      schema: {
        params: paramsIdSchema,
        body: instructorsSchemas.updateInstructorSchema,
      },
    },
    instructorsController.updateInstructorById
  );

  server.delete(
    '/:id',
    {
      preHandler: [
        server.authenticate,
        server.sanitizeRequest({ params: paramsIdSchema }),
      ],
      schema: {
        params: paramsIdSchema,
      },
    },
    instructorsController.deleteInstructorById
  );
};

export default instructorsRouteHandler;
