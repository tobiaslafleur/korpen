import { FastifyInstance } from 'fastify';
import * as sessionsController from '~/components/controllers/sessions';
import * as sessionsSchemas from '~/components/schemas/sessions';

const sessionsRouteHandler = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: sessionsSchemas.loginSchema,
      },
    },
    sessionsController.createSession
  );

  server.get(
    '/:id',
    {
      preHandler: [server.authenticate],
    },
    sessionsController.getSessions
  );

  server.delete(
    '/',
    {
      preHandler: [server.authenticate],
    },
    sessionsController.deleteSessionById
  );
};

export default sessionsRouteHandler;
