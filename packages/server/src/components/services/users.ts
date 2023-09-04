import { InsertObject } from 'kysely';
import { DB } from 'kysely-codegen';
import pg from '~/db/pg';

export const createUser = async (values: InsertObject<DB, 'users'>) => {
  return await pg
    .insertInto('users')
    .values(values)
    .returning([
      'id',
      'email',
      'first_name',
      'last_name',
      'created_at',
      'updated_at',
    ])
    .executeTakeFirst();
};

export const getUsers = async () => {
  return await pg
    .selectFrom('users')
    .select([
      'id',
      'email',
      'first_name',
      'last_name',
      'created_at',
      'updated_at',
    ])
    .execute();
};
