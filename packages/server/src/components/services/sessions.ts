import { randomUUID } from 'crypto';
import redis from '~/db/redis';

export const createSession = async (userId: string) => {
  const sessionId = randomUUID().replaceAll('-', '');

  const SESSION_KEY = `session:${sessionId}`;
  const USER_KEY = `user:${userId}`;

  await Promise.all([
    redis.set(SESSION_KEY, JSON.stringify({ userId })),
    redis.sAdd(USER_KEY, JSON.stringify({ sessionId })),
  ]);

  await redis.expire(SESSION_KEY, 60 * 60);

  return sessionId;
};

export const getSessions = async (userId: string) => {
  const USER_KEY = `user:${userId}`;

  const res = await redis.sMembers(USER_KEY);

  return res.map(session => JSON.parse(session));
};

export const deleteSessionById = async (sessionId: string) => {
  const SESSION_KEY = `session:${sessionId}`;

  await redis.del(SESSION_KEY);
};
