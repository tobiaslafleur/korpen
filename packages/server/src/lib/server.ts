import fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import config from '~/lib/config';

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

export const buildServer = () => {
  const opts = config.NODE_ENV === 'production' ? HTTPS_OPTIONS : {};

  const server = fastify({
    ...opts,
  });

  return server;
};
