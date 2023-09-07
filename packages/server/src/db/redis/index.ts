import { createClient } from 'redis';

const redis = createClient({
  url: 'redis://default:redispassword@129.151.214.166:6379/0',
});

export default redis;
