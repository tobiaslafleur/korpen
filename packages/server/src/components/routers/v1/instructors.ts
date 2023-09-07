import { FastifyInstance } from 'fastify';
import * as instructorsController from '~/components/controllers/instructors';
import { paramsIdSchema } from '~/components/schemas/common';
import * as instructorsSchemas from '~/components/schemas/instructors';

const instructorsRouteHandler = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      preHandler: [server.authenticate],
      schema: {
        body: instructorsSchemas.createInstructorSchema,
      },
    },
    instructorsController.createInstructor
  );

  server.get('/', instructorsController.getInstructors);

  server.get('/:id', instructorsController.getInstructorById);

  server.patch(
    '/:id',
    {
      preHandler: [server.authenticate],
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
      preHandler: [server.authenticate],
      schema: {
        params: paramsIdSchema,
      },
    },
    instructorsController.deleteInstructorById
  );
};

export default instructorsRouteHandler;
