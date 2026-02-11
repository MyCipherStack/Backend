import { env } from '@/config/env';
import { RedisOptions } from 'ioredis';


export const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
};







// export const redisClient = createClient({ url: 'redis://localhost:6379' })

// redisClient.connect()


