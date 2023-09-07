import { FastifyReply, FastifyRequest } from 'fastify';
import HTTPError from '~/lib/error';
import * as sessionsService from '~/components/services/sessions';
import * as usersService from '~/components/services/users';
import { Login } from '~/components/schemas/sessions';
import argon2 from 'argon2';

export const createSession = async (
  request: FastifyRequest<{ Body: Login }>,
  reply: FastifyReply
) => {
  try {
    const user = await usersService.getUserByEmailWithPassword(
      request.body.email
    );

    if (!user) {
      throw new HTTPError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    const validPassword = await argon2.verify(
      user.password,
      request.body.password
    );

    if (!validPassword) {
      throw new HTTPError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    const session = await sessionsService.createSession(user.id);

    reply.setCookie('session', session, {
      path: '/',
      maxAge: 60 * 60,
      httpOnly: true,
      secure: true,
    });

    return reply.status(201).send({ session });
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

    if (!sessions || sessions.length < 1) {
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

export const deleteSession = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await sessionsService.deleteSessionById(request.session.sessionId);

    reply.clearCookie('session', {
      secure: true,
      httpOnly: true,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await usersService.getUserById(request.session.userId);

    if (!user) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply
      .status(200)
      .send({ session: request.session.sessionId, ...user });
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};
