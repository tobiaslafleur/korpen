import { FastifyInstance } from 'fastify';
import instructorsRouteHandler from '~/components/routers/v1/instructors';
import sessionsRouteHandler from '~/components/routers/v1/sessions';
import usersRouteHandler from '~/components/routers/v1/users';
import { checkDbHealth } from '~/lib/db';
import HTTPError from '~/lib/error';

const routeHandler = async (server: FastifyInstance) => {
  server.get('/healthcheck', async (_request, reply) => {
    try {
      await checkDbHealth();

      reply.status(200).send({ message: 'OK' });
    } catch (error) {
      throw new HTTPError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database is not responding',
      });
    }
  });

  server.register(usersRouteHandler, { prefix: '/users' });
  server.register(sessionsRouteHandler, { prefix: '/sessions' });
  server.register(instructorsRouteHandler, { prefix: '/instructors' });
};

export default routeHandler;
