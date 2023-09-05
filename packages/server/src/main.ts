import config from '~/lib/config';
import { checkDbHealth } from '~/lib/db';
import { gracefulShutdown } from '~/lib/gracefulShutdown';
import logger from '~/lib/logger';
import { buildServer } from '~/lib/server';

const main = async () => {
  const server = buildServer();

  try {
    await checkDbHealth();
  } catch (error) {
    gracefulShutdown(server);
  }

  server.listen({ port: config.PORT, host: config.HOST }, (error, address) => {
    if (error) gracefulShutdown(server);

    logger.info(`Server is listening on ${address}`);
  });
};

main();
