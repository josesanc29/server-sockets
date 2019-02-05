import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { isObject } from "util";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {
    const usuario = new Usuario ( cliente.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const desconectar = ( cliente: Socket )=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
    });
}
//Escuchar mensaje
export const mensaje = ( cliente: Socket , socketIO: socketIO.Server ) =>{    
    cliente.on('mensaje' , (payload:{ de: string , cuerpo: string})=>{
        console.log('Mensaje recibido', payload);
        socketIO.emit('mensaje-nuevo', payload );
    });
}
//Configurar-usuario
export const configurarUsuario = ( cliente: Socket , socketIO: socketIO.Server ) =>{    
    cliente.on('configurar-usuario' , (payload:{ nombre: string}, callBack: Function)=>{
        // console.log('Configurando Usuario', payload.nombre);
        // socketIO.emit('mensaje-nuevo', payload );
        usuariosConectados.actualizaNombre(cliente.id , payload.nombre);
        callBack({
            ok: true,
            mensaje : `Usuario ${payload.nombre} configurado`,
        })
    });
}
