import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { isObject } from "util";

export const desconectar = ( cliente: Socket )=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
    });
}
//Escuchar mensaje
export const mensaje = ( cliente: Socket , socketIO: socketIO.Server ) =>{    
    cliente.on('mensaje' , (payload:{ de: string , cuerpo: string})=>{
        console.log('Mensaje recibido', payload);
        socketIO.emit('mensaje-nuevo', payload );
    });
}
