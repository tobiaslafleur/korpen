import { FastifyInstance } from 'fastify';
import * as usersController from '~/components/controllers/users';

const usersRouteHandler = async (server: FastifyInstance) => {
  server.post('/', usersController.createUser);

  server.get('/', usersController.getUsers);
};

export default usersRouteHandler;
