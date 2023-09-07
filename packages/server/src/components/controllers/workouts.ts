import { FastifyReply, FastifyRequest } from 'fastify';
import { ParamsId } from '~/components/schemas/common';
import { CreateWorkout, UpdateWorkout } from '~/components/schemas/workouts';
import * as workoutsService from '~/components/services/workouts';
import HTTPError from '~/lib/error';

export const createWorkout = async (
  request: FastifyRequest<{ Body: CreateWorkout }>,
  reply: FastifyReply
) => {
  try {
    console.log('asdasd');

    const workout = await workoutsService.createWorkout(request.body);

    if (!workout) {
      throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return reply.status(201).send(workout);
  } catch (error) {
    console.log(error);

    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getWorkouts = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const workouts = await workoutsService.getWorkouts();

    if (!workouts) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(workouts);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getWorkoutById = async (
  request: FastifyRequest<{ Params: ParamsId }>,
  reply: FastifyReply
) => {
  try {
    const workout = await workoutsService.getWorkoutById(request.params.id);

    if (!workout) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(workout);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const updateWorkoutById = async (
  request: FastifyRequest<{ Params: ParamsId; Body: UpdateWorkout }>,
  reply: FastifyReply
) => {
  try {
    if (Object.keys(request.body).length === 0) {
      throw new HTTPError({
        code: 'BAD_REQUEST',
        message: 'No fields were sent',
      });
    }

    const workout = await workoutsService.updateWorkoutById(
      request.params.id,
      request.body
    );

    if (!workout) {
      throw new HTTPError({ code: 'NOT_FOUND', message: 'Resource not found' });
    }

    return reply.status(200).send(workout);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    throw new HTTPError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const deleteWorkoutById = async (
  request: FastifyRequest<{ Params: ParamsId }>,
  reply: FastifyReply
) => {
  try {
    const result = await workoutsService.deleteWorkoutById(request.params.id);

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
