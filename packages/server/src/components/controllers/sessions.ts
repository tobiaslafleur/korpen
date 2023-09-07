import { FastifyReply, FastifyRequest } from 'fastify';
import HTTPError from '~/lib/error';
import * as sessionsService from '~/components/services/sessions';

export const createSession = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const session = await sessionsService.createSession(
      'usr_56e4b487eb06459b88e5bb21f81a1b7f'
    );

    reply.header('set-cookie', `session=${session}`);

    return reply.status(201).send(session);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getSessions = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const sessions = await sessionsService.getSessions(request.params.id);

    if (!sessions) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(201).send(sessions);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};
