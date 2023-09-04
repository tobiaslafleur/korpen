import { FastifyReply, FastifyRequest } from 'fastify';
import HTTPError from '~/lib/error';
import * as usersService from '~/components/services/users';
import { DatabaseError } from 'pg';
import argon2 from 'argon2';
import { omit } from '~/lib/utils';

export const createUser = async (
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
      confirm_password: string;
      first_name: string;
      last_name: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const hash = await argon2.hash(request.body.password);

    const user = await usersService.createUser({
      ...omit(request.body, ['confirm_password']),
      password: hash,
    });

    if (!user) {
      throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return reply.status(201).send(user);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof DatabaseError) {
      if (error.code === '23505') {
        throw new HTTPError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getUsers = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await usersService.getUsers();

    if (!users) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(users);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};