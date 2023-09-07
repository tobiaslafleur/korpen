import { FastifyReply, FastifyRequest } from 'fastify';
import HTTPError from '~/lib/error';

const authenticate = async (request: FastifyRequest, _reply: FastifyReply) => {
  if (!request.session?.sessionId || !request.session?.userId) {
    throw new HTTPError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized',
    });
  }
};

export default authenticate;
