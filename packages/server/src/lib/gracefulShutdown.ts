import { FastifyInstance } from 'fastify';
import pg from '~/db/pg';
import logger from '~/lib/logger';

const signals = ['SIGTERM', 'SIGINT', 'SIGBREAK'] as const;

export const gracefulShutdown = async (server: FastifyInstance) => {
  await server.close();
  await pg.destroy();

  logger.info('Services successfully closed, shutting down');

  process.exit(1);
};

export const registerSignals = async (server: FastifyInstance) => {
  signals.forEach(signal => {
    process.on(signal, async () => {
      logger.error(`${signal} received, starting graceful shutdown`);
      await gracefulShutdown(server);
    });
  });
};
