import { CronJob } from 'cron';
import redis from '~/db/redis';
import logger from '~/lib/logger';

export const cleanupRedis = new CronJob('*/5 * * * * *', async () => {
  let cursor = 0;
  const pattern = 'user:*';
  const userIds: string[] = [];

  do {
    const { cursor: newCursor, keys } = await redis.scan(0, {
      COUNT: 100,
      MATCH: pattern,
    });

    userIds.push(...keys);

    cursor = newCursor;
  } while (cursor !== 0);

  userIds.forEach(async userId => {
    const sessions = await redis.sMembers(userId);

    sessions.forEach(async session => {
      const { sessionId } = JSON.parse(session);

      const res = await redis.get(`session:${sessionId}`);

      if (!res) {
        logger.info('Removing expired session');
        await redis.sRem(userId, session);
      }
    });
  });
});
