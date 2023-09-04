import { FastifyInstance } from 'fastify';
import usersRouteHandler from '~/components/routers/v1/users';

const routeHandler = async (server: FastifyInstance) => {
  server.get('/healthcheck', async (_request, reply) => {
    return reply.status(200).send({ message: 'OK' });
  });

  server.register(usersRouteHandler, { prefix: '/users' });
};

export default routeHandler;
