export class Usuario {
    uid: string;
    nombre: string;
    email: string;
    pass: string;
    apellido:string;
    tipo:string;
    dni:string;
    estado:number;
    img1:string;
    img2:string;
    rol:string;
    edad:number;
    obraSocial:string;
    especialidades:any;
    atencion:Array<any>;

    constructor(){
        this.especialidades=[];
        this.atencion=[];
    }
}