import express from 'express';
import { SERVER_PORT } from '../global/enviorement';
import socketIO from 'socket.io';
import http from 'http';


export default class Server{
    
    private static _instance: Server;
    public app: express.Application; 
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO( this.httpServer );
        this.escuchaSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }
    start(callback: Function){
        this.httpServer.listen(this.port , callback);
    }

    private escuchaSockets(){
        console.log('Escuchando conexiones a SOCKETS');
            this.io.on('connection', cliente =>{
                console.log('Nuevo cliente conectado...' + cliente);

            });
    }
}