import { DatabaseError } from 'pg';
import HTTPError from '~/lib/error';
import * as instructorsService from '~/components/services/instructors';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateInstructor,
  UpdateInstructor,
} from '~/components/schemas/instructors';
import { ParamsId } from '~/components/schemas/common';

export const createInstructor = async (
  request: FastifyRequest<{ Body: CreateInstructor }>,
  reply: FastifyReply
) => {
  try {
    const instructor = await instructorsService.createInstructor(request.body);

    if (!instructor) {
      throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return reply.status(201).send(instructor);
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

export const getInstructors = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const instructors = await instructorsService.getInstructors();

    if (!instructors) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(instructors);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getInstructorById = async (
  request: FastifyRequest<{ Params: ParamsId }>,
  reply: FastifyReply
) => {
  try {
    const instructor = await instructorsService.getInstructorById(
      request.params.id
    );

    if (!instructor) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(instructor);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const updateInstructorById = async (
  request: FastifyRequest<{ Params: ParamsId; Body: UpdateInstructor }>,
  reply: FastifyReply
) => {
  try {
    const instructor = await instructorsService.updateInstructorById(
      request.params.id,
      request.body
    );

    if (!instructor) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(instructor);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const deleteInstructorById = async (
  request: FastifyRequest<{ Params: ParamsId }>,
  reply: FastifyReply
) => {
  try {
    const result = await instructorsService.deleteInstructorById(
      request.params.id
    );

    if (result.numDeletedRows < 1) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};
