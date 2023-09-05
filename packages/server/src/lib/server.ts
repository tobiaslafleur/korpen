import fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import routeHandler from '~/components/routers/v1/root';
import config from '~/lib/config';
import { errorHandler, notFoundHandler } from '~/lib/error';
import validateRequest from '~/middlewares/validateRequest';

export const buildServer = () => {
  const opts = config.NODE_ENV === 'production' ? HTTPS_OPTIONS : {};

  const server = fastify({
    ...opts,
  });

  server.setValidatorCompiler(validateRequest);

  server.register(routeHandler, {
    prefix: '/api/v1',
  });

  server.setErrorHandler(errorHandler);
  server.setNotFoundHandler(notFoundHandler);

  return server;
};

const HTTPS_OPTIONS = {
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(
      path.join(__dirname, '..', '..', 'https', 'privatekey.key')
    ),
    cert: fs.readFileSync(
      path.join(__dirname, '..', '..', 'https', 'certificate.crt')
    ),
  },
};
