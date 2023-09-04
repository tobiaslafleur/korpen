import config from '~/lib/config';
import logger from '~/lib/logger';
import { buildServer } from '~/lib/server';

const main = async () => {
  const server = buildServer();

  server.listen({ port: config.PORT, host: config.HOST }, (error, address) => {
    if (error) {
      process.exit(1);
    }

    logger.info(`Server is listening on ${address}`);
  });
};

main();
