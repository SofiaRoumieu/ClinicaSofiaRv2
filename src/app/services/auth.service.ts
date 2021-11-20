import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Turno } from '../clases/turno';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:any= new Usuario();
  dbUsersRef:AngularFirestoreCollection<any>;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    public storage:AngularFireStorage) {
      this.dbUsersRef=this.db.collection("usuarios");
     }

  public async signIn(email:string, pass:string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, pass).then(user => {
        if(user.user.emailVerified)
        {
          resolve(user);
          this.router.navigate(['/home']);
        }
        else
        { 
          if(user.user.email == "admin@admin.com")
          {
          this.router.navigate(['/home']);

          }
          else
          {
            console.log("mail no verificado");
            Swal.fire({
              title:'Cuenta no verificada',
              text:'Ingrese a su correo electrónico y verifique su cuenta.',
              icon:'error',
              confirmButtonText:'Cerrar'
            });//.then(()=>{
            //this.router.navigate(['/verificacion']);
            

          }
        }
      })
      .catch(err => {
        reject(err);
        Swal.fire({
          title:'Error al iniciar sesión',
          text:'Error: '+ err,
          icon:'error',
          confirmButtonText:'Cerrar'
        });
      });

    })
  
  }

  public async register(usuario: Usuario) {
    return this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass);
  }
  
  isLoggedIn() {
    return this.afAuth.authState;
  }
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  updateHorario(actor:Usuario)
  { 
    console.log(actor.uid);
    return  this.db.collection('usuarios').doc(actor.uid).update({
      atencion: actor.atencion,
    }) 

  }


  async registerPaciente(usuario: Usuario, img1, img2) {
    var router = this.router;
    var dbRef = this.db;
    var ad = this;

      this.uploadImg(usuario, img1, img2).then(res =>{
      console.log("llega");
       this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass)
     .then(function(credencial) {

       ad.router.navigate(['/login']);                  
       ad.sendVerificationEmail().then(res =>{
        console.log("Se envio bien el mail");
      }).catch(error =>{
        console.log("No llega el mail");
      });  

       dbRef.collection('usuarios').doc(credencial.user.uid).set({
         uid: credencial.user.uid,
         nombre: usuario.nombre,
         apellido: usuario.apellido,
         edad:usuario.edad,
         email: usuario.email,
         rol: usuario.tipo,
         dni:usuario.dni,
         obraSocial:usuario.obraSocial,
         img1: usuario.img1,
         img2: usuario.img2
       })
       .then(function (docRef) {
         
         console.log("Bien");
       });
       credencial.user.getIdToken()
         .then(function (token) {
         localStorage.setItem('token', token);
       });
     })
     .catch(function (error) {
       console.error("Error: ", error);
       Swal.fire({
        title:'Error al registrar paciente',
        text:'Error: '+ error,
        icon:'error',
        confirmButtonText:'Cerrar'
      });
     });
     
     
    })
    
  }
  
  //Registro Profesional
  public registerProfesional(usuario:Usuario,especialidades:Array<any>,img1)
  {
     
    var router = this.router;
    var dbRef = this.db;
    var ad = this;

      this.uploadImgProf(usuario, img1).then(res =>{
      console.log("llega");
       this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass)
     .then(function(credencial) {

       ad.router.navigate(['/login']);                  
       ad.sendVerificationEmail().then(res =>{
        Swal.fire({
          title:'E-mail de verificación enviado',
          text:'Busque el correo enviado en su casilla y haga clic en el enlace.',
          icon:'success',
          confirmButtonText:'Cerrar'
        });
      }).catch(error =>{
        Swal.fire({
          title:'Error al enviar e-mail',
          text:'El correo de verificación no fue enviado',
          icon:'error',
          confirmButtonText:'Cerrar'
        });
      });  

       dbRef.collection('usuarios').doc(credencial.user.uid).set({
         uid: credencial.user.uid,
         nombre: usuario.nombre,
         apellido: usuario.apellido,
         edad:usuario.edad,
         email: usuario.email,
         rol: usuario.tipo,
         dni:usuario.dni,
         estado:1,
         img1: usuario.img1,
         especialidades:especialidades,
         atencion:usuario.atencion
       })
       .then(function (docRef) {
         
         console.log("Bien");
       });
       credencial.user.getIdToken()
         .then(function (token) {
         localStorage.setItem('token', token);
       });
     })
     .catch(function (error) {
       console.error("Error: ", error);
       Swal.fire({
        title:'Error al registrar usuario',
        text:'Error: '+ error,
        icon:'error',
        confirmButtonText:'Cerrar'
      });
     });
     
     
    })
    
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  public uploadImg( usuario: Usuario, imagen1, imagen2){
    return new Promise((resolve,rejects) =>{
      this.subirArchivo(usuario.email+"_img1",imagen1,{nombre:usuario.nombre,
        apellido:usuario.apellido,
        dni:usuario.dni,
        id:usuario.uid,
        email:usuario.email,
        rol:usuario.rol,
      
      
      }).then((img)=>{
          this.subirArchivo(usuario.email+"_img2",imagen2,{nombre:usuario.nombre,
            apellido:usuario.apellido,
            dni:usuario.dni,
            id:usuario.uid,
            email:usuario.email,
            rol:usuario.rol,
          }).then(img2=>{
           img.ref.getDownloadURL().then(data=>{
            usuario.img1 = data;
            console.log(data); 
            img2.ref.getDownloadURL().then( data2=>{
              usuario.img2 = data2;
              resolve(data2);
              
             });
           });  
          });
        });
    })  

    }


public uploadImgProf( usuario: Usuario, imagen1){
  return new Promise((resolve,rejects) =>{
    this.subirArchivo(usuario.email+"_img1",imagen1,{nombre:usuario.nombre,
      apellido:usuario.apellido,
      dni:usuario.dni,
      id:usuario.uid,
      email:usuario.email,
      rol:usuario.rol,
    }).then((img)=>{
          img.ref.getDownloadURL().then(data=>{
          usuario.img1 = data;
          console.log(data); 
          resolve(data);
          });  
        });
  })  

}
  
  
  subirArchivo(nombreArchivo: string, datos: any,metadata:any) {
      return this.storage.upload(nombreArchivo, datos, {customMetadata:metadata });
    }

    //mover a data.service
    async getUserByMail(email: string) {

      let usrsRef = await this.dbUsersRef.ref.where("email", "==", email).get();
      let listado:Array<any> = new Array<any>();
      usrsRef.docs.map(function(x){
          listado.push(x.data());
      });
      return listado;
    }

    getUserUid()
    {  
      return new Promise((resolve, reject) => {
        this.afAuth.onAuthStateChanged(function(user){
            if(user)
            {
              resolve(user.uid)
            }
            else
            {
              resolve("0")
            }
        })
      })
    }

    getCurrentUserMail(): string {
      return firebase.auth().currentUser.email;
    }

    TraerTodos(){
      return this.db.collection('usuarios').valueChanges();
    }
  
    HabilitarProfesional(profesioral:Usuario){
      console.log("llego al servicio"+ profesioral);
      console.log(profesioral.email);
      this.getUserByMail(profesioral.email).then(res=>{
        if(res.length > 0){ 
          this.db.collection('usuarios').doc(res[0].uid).update({
            'estado' :0
          })
        }
      })
    }

    DeshabilitarProfesional(profesioral:Usuario){
      console.log("llego al servicio"+ profesioral);
      console.log(profesioral.email);
      this.getUserByMail(profesioral.email).then(res=>{
        if(res.length > 0){ 
          this.db.collection('usuarios').doc(res[0].uid).update({
            'estado' :1
          })
        }
      })
    }
  
    async registerTurnos(turno:Turno){
      return new Promise((resolve, reject) =>{
        this.db.collection("turnos").ref.orderBy('id',"desc").limit(1).get().then(res=>{    
          res.forEach(a=>{
            console.log("estamos en registro de turno");
            console.log(a.id);
            let ida:Number =1;
            console.log(Number(a.id));
            if(Number(a.id)!==NaN){
              console.log("entro a Number(a.id)!=NaN");
              ida =  Number(a.id) + 1;
            }
            console.log(ida);
            this.db.collection("turnos").doc(ida.toString()).set({
             
             paciente:turno.paciente,
             profesional:turno.profesional,
             fecha:turno.fecha,
             id:ida,
             hora:turno.hora,
             estado:turno.estado,
             especialidad:turno.especialidad,
             comentario:turno.comentario
              
            }).then(res=>{
              
              resolve(true);

            }).catch(error=>{

               reject(error);
               Swal.fire({
                title:'Error',
                text:'Error al registrar el turno: '+ error,
                icon:'error',
                confirmButtonText:'Cerrar'
              });
            })

          })
        }); 

      });

    }

    updateEstadoTurno(turno:Turno,estado:number)
    { 
      console.log(turno);
      console.log("modificando estado de turno");
      console.log(turno.id.toString());
      console.log(estado);
      return  this.db.collection('turnos').doc(turno.id.toString()).update({
        estado: estado,
        }) 

    }

  updateOpinion(turno:Turno,user:Usuario,valor:string,valor2:number,edad ?:number,temperatura?:number,presion?:number,peso?:number, altura?:number,datosAdicional?:Array<any>)
  { 
    if(user.rol == "paciente")
      {
        return  this.db.collection('turnos').doc(turno.id.toString()).update({
          opinionPaciente:valor,
          calificacionPaciente:valor2
        });
      }
    else
    { 
      console.info(datosAdicional);
      return  this.db.collection('turnos').doc(turno.id.toString()).update({
        opinionProfesional:valor,
        calificacionProfesional:valor2,
        edad:edad,
        temperatura:temperatura,
        presion:presion,
        peso:peso,
        altura:altura,
        datosAdicionales:datosAdicional
      });
    }
  }

  upadteJustificacion(turno:Turno,valor:string)
  {
    return  this.db.collection('turnos').doc(turno.id.toString()).update({
      comentario:valor,
    });
  }

}
