import { IRedisServices } from "@/domain/services/IRedisServices";
import { redisOptions } from "@/infrastructure/database/connection/redisConnection";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import Redis from "ioredis";



export class RedisServices implements IRedisServices {

    private redisClient: Redis

    constructor() {
        this.redisClient = new Redis(redisOptions)

          this.redisClient.on('connect', () => {
            logger.info('Redis client connected');
        });

        this.redisClient.on('error', (err) => {
          logger.error('Redis Client Errorr', err);
        });
    }

    async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key)
    }

    async set(key: string, value: string, expirySecond?: number): Promise<string | null> {
        if (expirySecond) {
            return await this.redisClient.set(key, value, 'EX', expirySecond)
        } {
            return await this.redisClient.set(key, value)
        }
    }

    async del(key: string): Promise<void> {
        await this.redisClient.del(key)
    }

}