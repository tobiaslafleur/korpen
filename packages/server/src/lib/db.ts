import { sql } from 'kysely';
import pg from '~/db/pg';

export const checkDbHealth = async () => {
  await pgHealthCheck();
};

export const pgHealthCheck = async () => {
  await pg.executeQuery(sql`SELECT 1`.compile(pg));
};
