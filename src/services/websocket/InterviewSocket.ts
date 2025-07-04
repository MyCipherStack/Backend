import { Socket, Server } from "socket.io";
import { BaseSocket } from "./BaseSocke";
import { logger } from "@/logger";




export class InterviewSocket extends BaseSocket {


    private io: Server | null = null

    private socket: Socket | null = null


    protected async connectSocket(socket: Socket, io: Server): Promise<void> {


        socket.on("join-interview", ({ roomId }) => {
            socket.join(roomId)
            const clients = io.sockets.adapter.rooms.get(roomId)
            const isInitiator = clients?.size === 1
            logger.info(roomId, "joinedInterview", isInitiator);
            socket.to(roomId).emit("joined", { roomId, isInitiator })
        })

        socket.on("offer", ({ roomId, data }) => {
            logger.info("offer", roomId);

            socket.to(roomId).emit('offer', data)
        })
        socket.on("answer", ({ roomId, data }) => {

            logger.info("answer", roomId);

            socket.to(roomId).emit('answer', data)
        })
        socket.on("candidate", ({ roomId, data }) => {
            logger.info("candidate", roomId);

            socket.to(roomId).emit('candidate', data)
        })

        socket.on("track-type", ({ roomId, kind, type }) => {
            logger.info("track-type", { kind, type })
            socket.to(roomId).emit("track-type", { kind, type })
        })


    }


}





