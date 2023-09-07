import { InsertObject, UpdateObject } from 'kysely';
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
    .orderBy('internal_id')
    .execute();
};

export const getUserById = async (userId: string) => {
  return await pg
    .selectFrom('users')
    .where('id', '=', userId)
    .select([
      'id',
      'email',
      'first_name',
      'last_name',
      'created_at',
      'updated_at',
    ])
    .executeTakeFirst();
};

export const getUserByEmailWithPassword = async (userEmail: string) => {
  return await pg
    .selectFrom('users')
    .where('email', '=', userEmail)
    .select([
      'id',
      'email',
      'password',
      'first_name',
      'last_name',
      'created_at',
      'updated_at',
    ])
    .executeTakeFirst();
};

export const updateUserById = async (
  userId: string,
  values: UpdateObject<DB, 'users'>
) => {
  return await pg
    .updateTable('users')
    .set(values)
    .where('id', '=', userId)
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

export const deleteUserById = async (id: string) => {
  return await pg.deleteFrom('users').where('id', '=', id).executeTakeFirst();
};
