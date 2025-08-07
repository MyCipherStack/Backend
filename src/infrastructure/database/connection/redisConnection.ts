import { env } from '@/config/env';
import { create } from 'domain';
import Redis, { RedisOptions } from 'ioredis';


export const redisOptions: RedisOptions = {
  host: env.REDIS_URL,
  // host: 'host',
  port: 6379,
};







// export const redisClient = createClient({ url: 'redis://localhost:6379' })

// redisClient.connect()


