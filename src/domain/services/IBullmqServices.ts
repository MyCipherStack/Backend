



export interface IBullmqQueueService {

    addJob(queueName: string, data: any, options?: any): Promise<void>

}