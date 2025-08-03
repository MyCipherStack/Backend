import { Socket, Server } from 'socket.io';
import { BaseSocket } from './BaseSocke';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class InterviewSocket extends BaseSocket {
  private io: Server | null = null;

  private socket: Socket | null = null;

  protected async connectSocket(socket: Socket, io: Server): Promise<void> {
    socket.on('join-interview', ({ roomId, userName }) => {
      socket.join(roomId);
      const clients = io.sockets.adapter.rooms.get(roomId);
      const isInitiator = clients?.size === 1;
      logger.info(roomId, 'joinedInterview', isInitiator);
      const oppName = userName;
      socket.to(roomId).emit('joined', { roomId, isInitiator, oppName });
    });

    socket.on('offer', ({ roomId, data }) => {
      logger.info('offer', roomId);

      socket.to(roomId).emit('offer', data);
    });
    socket.on('answer', ({ roomId, data }) => {
      logger.info('answer', roomId);

      socket.to(roomId).emit('answer', data);
    });
    socket.on('candidate', ({ roomId, data }) => {
      logger.info('candidate', { roomId, data });

      socket.to(roomId).emit('candidate');
    });

    socket.on('track-type', ({ roomId, kind, type }) => {
      logger.info('track-type', { kind, type });
      socket.to(roomId).emit('track-type', { kind, type });
    });

    socket.on('iSend-message', ({
      roomId, userName, text, time,
    }) => {
      console.log(roomId, text, userName, time, 'message');

      socket.to(roomId).emit('receive-message', { userName, text, time });
    });
  }
}
