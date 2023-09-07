import { FastifyInstance } from 'fastify';
import * as sessionsController from '~/components/controllers/sessions';
import { paramsIdSchema } from '~/components/schemas/common';
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
      preHandler: [
        server.authenticate,
        server.sanitizeRequest({ params: paramsIdSchema }),
      ],
      schema: {
        params: paramsIdSchema,
      },
    },
    sessionsController.getSessions
  );

  server.delete(
    '/',
    {
      preHandler: [server.authenticate],
    },
    sessionsController.deleteSession
  );

  server.get(
    '/me',
    { preHandler: [server.authenticate] },
    sessionsController.getUser
  );
};

export default sessionsRouteHandler;
