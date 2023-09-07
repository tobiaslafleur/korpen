import { FastifyInstance } from 'fastify';
import * as sessionsController from '~/components/controllers/sessions';

const sessionsRouteHandler = async (server: FastifyInstance) => {
  server.post('/', sessionsController.createSession);

  server.get('/:id', sessionsController.getSessions);
};

export default sessionsRouteHandler;
