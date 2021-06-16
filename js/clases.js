class Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        let _nombre = nombre
        let _edad = edad
        let _img = img
        let _comentarios = comentarios
        let _sonido = sonido
        this.getNombre = () => _nombre
        this.setNombre = (nombre) => _nombre = nombre
        this.getEdad = () => _edad
        this.setEdad = (edad) => _edad = edad
        this.getImg = () => _img
        this.setImg = (img) => _img = img
        this.getComentarios = () => _comentarios
        this.setComentarios = (comentarios) => _comentarios = comentarios
        this.getSonido = () => _sonido
        this.setSonido = (sonido) => _sonido = sonido    
    }

    get nombre(){
        return this.getNombre()
    }

    set nombre(nombre){
        this.setNombre(nombre)
    }

    get edad(){
        return this.getEdad()
    }

    set edad(edad){
        this.setEdad(edad)
    } 
    
    get img(){
        return this.getImg()
    }

    set img(img){
        this.setImg(img)
    } 
    
    get comentarios(){
        return this.getComentarios()
    }

    set comentarios(comentarios){
        this.setComentarios(comentarios)
    }

    get sonido(){
        return this.getSonido()
    }

    set sonido(sonido){
        this.setSonido(sonido)
    }

}

class Leon extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido)
    }

    rugir = () =>{

    }
}

class Lobo extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido)
    }

    aullar = () =>{
        
    }
}

class Oso extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido)
    }

    gruñir = () =>{
        
    }
}

class Serpiente extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido)
    }

    sisear = () =>{
        
    }
}

class Aguila extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido)
    }

    chillar = () =>{
        console.log(this.nombre,this.sonido,this.comentarios,this.edad,this.img);
    }
}

export default {Animal,Leon,Lobo,Oso,Serpiente,Aguila}

