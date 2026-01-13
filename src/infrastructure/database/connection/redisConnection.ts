import { env } from '@/config/env';
import { create } from 'domain';
import Redis, { RedisOptions } from 'ioredis';


export const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  // host: 'host',
  port: env.REDIS_PORT,
};







// export const redisClient = createClient({ url: 'redis://localhost:6379' })

// redisClient.connect()


