import { Socket, Server } from 'socket.io';
import { BaseSocket } from './BaseSocke';

export class PairProgramSocket extends BaseSocket {
  private io: Server | null = null;

  private socket: Socket | null = null;

  protected async connectSocket(socket: Socket, io: Server): Promise<void> {
    socket.on('join-pairProgramming', async ({ roomId, userName }) => {
      socket.join(roomId);
      console.log('join pair', roomId, userName);
      socket.to(roomId).emit('pairProgram-update', { userName });
    });

    socket.on('code-change', ({ roomId, code }) => {
      console.log('code change', roomId);
      socket.to(roomId).emit('code-change', code);
    });

    socket.on('cursor-change', ({ roomId, userId, position }) => {
      console.log('cursor-change', roomId, userId, position);
      socket.to(roomId).emit('cursor-change', { userId, position });
    });

    socket.on('send-message', ({
      roomId, userName, text, time,
    }) => {
      console.log(roomId, text, 'in pariprogamming');

      socket.to(roomId).emit('receive-message', { userName, text, time });
    });

    socket.on('signal', ({ roomId, data }) => { // I only this for audio call  first i did this  for learn
      console.log('signal', roomId);
      socket.to(roomId).emit('signal', data);
    });

    socket.on('mute-status-changed', ({ roomId, userId, isMuted }) => {
      console.log(roomId, userId, isMuted);

      socket.to(roomId).emit('mute-status-changed', { userId, isMuted });
    });
  }
}
