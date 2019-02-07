import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[] = [];
    constructor () {
        
    }

    // Añade usuario a la lista
    agregarUsuario (usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    //Modificar el nombre de usuario dentro de la lista
    actualizaNombre (id: string , nombre: string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('ACTUALIZANDO NOMBRE DE USUARIO');
        console.log(this.lista);
    }
    //GET de la lista de usuarios
    getLista(){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    //Obtener usuario de la lista por su id
    getUsuario(id: string){
        return this.lista.filter( (usuario : any) =>{
            return usuario.id === id;
        })[0];
    }
    //Obtener usuarios en una sala particular 
    getUsuarioEnSala(sala: string) {
        return this.lista.filter( (usuario:any)=> {
            return usuario.sala === sala;
        });
    }
    //Borrar usuario
    borrarUsuario (id: string){
        const usuarioTemp = this.getUsuario(id);
        this.lista = this.lista.filter( (usuario)=>{
            return usuario.id !== id;
        });
    }
}