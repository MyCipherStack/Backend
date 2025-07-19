import { Socket, Server } from "socket.io";
import { BaseSocket } from "./BaseSocke";
import { logger } from "@/logger";





export class NotificationSocket extends BaseSocket {

    private io: Server | null = null

    private socket: Socket | null = null


    protected async connectSocket(socket: Socket, io: Server): Promise<void> {

        this.io = io
        this.socket = socket

        socket.on("join-user-room", (userId) => {

            socket.join(userId)

            logger.info("userjoind socket stared", { userId })

        })



        socket.on("discount-user-room", () => {
            socket.off
        })
    }

    emitNotification = async (userId: string, payload: unknown): Promise<void> => {
        console.log(this.socket.rooms, "romssss");

        logger.info("rooms", { data: this.socket?.rooms }); // Set with all joined rooms
        payload.isRead = false

        this.io?.to(userId).emit("notification", payload)

        logger.info(" notificaion sended", { userId, payload })
        // this.socket?.emit("notification", payload)
    }
}


export const notificationSocket = new NotificationSocket()
