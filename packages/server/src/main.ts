import config from '~/lib/config';
import { cleanupRedis } from '~/lib/cron';
import { checkDbHealth } from '~/lib/db';
import { gracefulShutdown } from '~/lib/gracefulShutdown';
import logger from '~/lib/logger';
import { buildServer } from '~/lib/server';

const main = async () => {
  const server = await buildServer();

  try {
    await checkDbHealth();
  } catch (error) {
    gracefulShutdown(server);
  }

  server.listen({ port: config.PORT }, (error, address) => {
    if (error) gracefulShutdown(server);

    cleanupRedis.start();

    logger.info(`Server is listening on ${address}`);
  });
};

main();
