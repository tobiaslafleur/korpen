import { InsertObject, UpdateObject } from 'kysely';
import { DB } from 'kysely-codegen';
import pg from '~/db/pg';

const SELECT = [
  'id',
  'first_name',
  'last_name',
  'created_at',
  'updated_at',
] as const;

export const createInstructor = async (
  values: InsertObject<DB, 'instructors'>
) => {
  return await pg
    .insertInto('instructors')
    .values(values)
    .returning([...SELECT])
    .executeTakeFirst();
};

export const getInstructors = async () => {
  return await pg
    .selectFrom('instructors')
    .select([...SELECT])
    .orderBy('created_at')
    .execute();
};

export const getInstructorById = async (instructorId: string) => {
  return await pg
    .selectFrom('instructors')
    .select([...SELECT])
    .where('id', '=', instructorId)
    .executeTakeFirst();
};

export const updateInstructorById = async (
  instructorId: string,
  values: UpdateObject<DB, 'instructors'>
) => {
  return await pg
    .updateTable('instructors')
    .set(values)
    .where('id', '=', instructorId)
    .returning([...SELECT])
    .executeTakeFirst();
};

export const deleteInstructorById = async (instructorId: string) => {
  return await pg
    .deleteFrom('instructors')
    .where('id', '=', instructorId)
    .executeTakeFirst();
};
