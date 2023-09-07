import { FastifyInstance } from 'fastify';
import * as workoutsController from '~/components/controllers/workouts';
import { paramsIdSchema } from '~/components/schemas/common';
import * as workoutsSchemas from '~/components/schemas/workouts';

const workoutsRouteHandler = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      preHandler: [
        server.authenticate,
        server.sanitizeRequest({ body: workoutsSchemas.createWorkoutSchema }),
      ],
      schema: {
        body: workoutsSchemas.createWorkoutSchema,
      },
    },
    workoutsController.createWorkout
  );

  server.get('/', workoutsController.getWorkouts);

  server.get(
    '/:id',
    {
      preHandler: [server.sanitizeRequest({ params: paramsIdSchema })],
      schema: {
        params: paramsIdSchema,
      },
    },
    workoutsController.getWorkoutById
  );

  server.patch(
    '/:id',
    {
      preHandler: [
        server.authenticate,
        server.sanitizeRequest({
          params: paramsIdSchema,
          body: workoutsSchemas.updateWorkoutSchema,
        }),
      ],
      schema: {
        params: paramsIdSchema,
        body: workoutsSchemas.updateWorkoutSchema,
      },
    },
    workoutsController.updateWorkoutById
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
    workoutsController.deleteWorkoutById
  );
};

export default workoutsRouteHandler;
