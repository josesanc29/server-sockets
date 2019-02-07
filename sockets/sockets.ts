import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { isObject } from "util";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket , socketIO: socketIO.Server) => {
    const usuario = new Usuario ( cliente.id);
    usuariosConectados.agregarUsuario(usuario);
    // socketIO.emit('usuarios-activos', usuariosConectados.getLista());
    
}

export const desconectar = ( cliente: Socket , socketIO: socketIO.Server)=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        socketIO.emit('usuarios-activos', usuariosConectados.getLista());

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
        usuariosConectados.actualizaNombre(cliente.id , payload.nombre);
        socketIO.emit('usuarios-activos', usuariosConectados.getLista());
        callBack({
            ok: true,
            mensaje : `Usuario ${payload.nombre} configurado`,
        })
 });
}

//Obtener Usuarios
export const obtenerUsuariosActivos = ( cliente: Socket , socketIO: socketIO.Server) =>{
    cliente.on('obtener-usuarios' , ()=>{
        socketIO.emit('usuarios-activos', usuariosConectados.getLista());
    })
}

