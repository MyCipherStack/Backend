import { IRedisServices } from "@/domain/services/IRedisServices";
import { redisOptions } from "@/infrastructure/database/connection/redisConnection";
import Redis from "ioredis";



export class RedisServices implements IRedisServices {

    private redisClient: Redis

    constructor() {
        this.redisClient = new Redis(redisOptions)
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
        this.redisClient.del(key)
    }

}