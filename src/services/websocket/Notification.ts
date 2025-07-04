import { Socket, Server } from "socket.io";
import { BaseSocket } from "./BaseSocke";
import { logger } from "@/logger";




export class Notification extends BaseSocket {


    private io:Server | null=null

    private socket:Socket | null =null


    protected async connectSocket(socket: Socket, io: Server): Promise<void> {

        this.io=io
        this.socket=socket

        socket.on("join-user-name", (userId) => {

            socket.join(userId)

            logger.info("userjoind", userId)

        })


        socket.on("discount-user-room", () => {

        })

        
    }
     emitNotfication=(payload:unknown)=>{

        this.socket?.emit("notification",payload)

    }
}