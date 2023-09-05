import { FastifyInstance } from 'fastify';
import * as usersController from '~/components/controllers/users';
import { paramsIdSchema } from '~/components/schemas/common';
import * as usersSchemas from '~/components/schemas/users';

const usersRouteHandler = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: usersSchemas.createUserSchema,
      },
    },
    usersController.createUser
  );

  server.get('/', usersController.getUsers);

  server.get(
    '/:id',
    {
      schema: {
        params: paramsIdSchema,
      },
    },
    usersController.getUserById
  );

  server.patch(
    '/:id',
    {
      schema: {
        params: paramsIdSchema,
        body: usersSchemas.updateUserSchema,
      },
    },
    usersController.updateUserById
  );

  server.delete(
    '/:id',
    {
      schema: {
        params: paramsIdSchema,
      },
    },
    usersController.deleteUserById
  );
};

export default usersRouteHandler;
