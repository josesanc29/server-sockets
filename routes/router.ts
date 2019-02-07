import {Router, Request, Response} from 'express';
import Server from "../clases/server";
import { resolve } from 'path';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', ( req: Request , resp: Response) => {
    resp.json({
        ok: true,
        mensaje:'El GET ha ido bien!!'
    });

});
router.post('/mensajes', ( req: Request , resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    }
    server.io.emit('mensaje-nuevo', payload);

    resp.json({
        ok: true,
        mensaje:'El POST ha ido bien!!',
        cuerpo,
        de
    });

});

router.post('/mensajes/:id', ( req: Request , resp: Response) => {

    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    // const server = Server.instance;
    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    }
    server.io.in( id ).emit('mensajes-privados', payload);
    

    resp.json({
        ok: true,
        mensaje:'El POST por ID_Mensaje ha ido bien!!',
        id,
        cuerpo,
        de
    });

});

// Servicio para obtener todos los ids de los usuarios
router.get('/usuarios', ( req: Request , resp: Response) => {
   
    // const server = Server.instance;
    const server = Server.instance;
    server.io.clients( (err: any , clientes: string[]) =>{
        if(err){
             return resp.json({
                ok: false,
                message: err
            });
        }
            resp.json({
            ok: true,
            clientes
            });
        
    });

    

});

// Servicio para obtener los id y el nombre de los usuarios conectados [ESTE ES EL SERVICIO QUE USAREMOS]
router.get('/usuarios/detail', ( req: Request , resp: Response) => {
   
    // const server = Server.instance;
    const server = Server.instance;
    usuariosConectados;
    server.io.clients( (err: any , clientes: string[]) =>{
        if(err){
             return resp.json({
                ok: false,
                message: err
            });
        }
            resp.json({
            ok: true,
            clientes: usuariosConectados.getLista()
            });
        
    });

    

});


export default router;