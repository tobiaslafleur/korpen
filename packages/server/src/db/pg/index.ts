import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from 'kysely-codegen';
import config from '~/lib/config';

const pg = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: config.DATABASE_URL,
    }),
  }),
});

export default pg;
