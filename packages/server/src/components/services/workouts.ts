import { InsertObject, UpdateObject } from 'kysely';
import { DB } from 'kysely-codegen';
import pg from '~/db/pg';

const SELECT = [
  'id',
  'name',
  'location',
  'day_of_week',
  'time_of_day',
  'date',
  'is_cancelled',
  'is_recurring',
] as const;

export const createWorkout = async (values: InsertObject<DB, 'workouts'>) => {
  return await pg
    .insertInto('workouts')
    .values(values)
    .returning([...SELECT])
    .executeTakeFirst();
};

export const getWorkouts = async () => {
  return await pg
    .selectFrom('workouts')
    .select([...SELECT])
    .execute();
};

export const getWorkoutById = async (workoutId: string) => {
  return await pg
    .selectFrom('workouts')
    .select([...SELECT])
    .where('id', '=', workoutId)
    .executeTakeFirst();
};

export const updateWorkoutById = async (
  workoutId: string,
  values: UpdateObject<DB, 'workouts'>
) => {
  return await pg
    .updateTable('workouts')
    .set(values)
    .where('id', '=', workoutId)
    .returning([...SELECT])
    .executeTakeFirst();
};

export const deleteWorkoutById = async (workoutId: string) => {
  return await pg
    .deleteFrom('workouts')
    .where('id', '=', workoutId)
    .executeTakeFirst();
};
