

import { Server, Socket } from "socket.io"

import { IUpdateLeaderBoardUsecase } from "../../application/interfaces/use-cases/ILeaderBoadrUseCase";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository";
import { logger } from "@/logger";
import { ILeaderBoardRepository } from "@/domain/repositories/ILeaderBoardRepository";


export abstract class BaseSocket{
  


    protected abstract connectSocket(socket:Socket,io:Server):Promise<void >

    public register(io: Server) {


        io.on("connection", (socket,) => {

    
            this.connectSocket(socket,io)



            // ------------------------------------------------------------------------------------------------------





            //Best Implimetation for WEBTRC 

        



            socket.on("join-user-name",(userId)=>{

                socket.join(userId)
                
                logger.info("userjoind",userId)

            })

            
            
            
            socket.on("discount-user-room",()=>{
                
            })


        })

    }
}