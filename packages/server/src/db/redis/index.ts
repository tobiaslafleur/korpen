import { createClient } from 'redis';
import config from '~/lib/config';

const redis = createClient({
  url: config.REDIS_URL,
});

export default redis;
