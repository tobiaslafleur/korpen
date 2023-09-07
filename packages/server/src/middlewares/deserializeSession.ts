import { FastifyReply, FastifyRequest } from 'fastify';
import redis from '~/db/redis';

const deserializeSession = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  const sessionId = request.cookies['session'];

  if (!sessionId) return;

  const userId = await redis.get(`session:${sessionId}`);

  if (!userId) return;

  //TODO: fetch user from database and add to session?

  request.session = {
    sessionId,
    userId: JSON.parse(userId).userId,
  };
};

export default deserializeSession;
