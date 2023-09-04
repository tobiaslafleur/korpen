import { FastifyInstance } from 'fastify';
import * as usersController from '~/components/controllers/users';

const usersRouteHandler = async (server: FastifyInstance) => {
  server.post('/', usersController.createUser);

  server.get('/', usersController.getUsers);

  server.get('/:id', usersController.getUserById);

  server.patch('/:id', usersController.updateUserById);

  server.delete('/:id', usersController.deleteUserById);
};

export default usersRouteHandler;
