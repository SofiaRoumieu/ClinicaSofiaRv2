import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  seleccionado:boolean;
  tipoIngreso:string="";
  emailClass:'';
  claveClass:'';
  email:string;
  clave:string;
  usuario:Usuario = new Usuario();
  img1:any;
  img2:any;
  lista:Array<any>;
  especialidades:Array<any> = new Array<any>();
  nuevaEspecialidad:string="";
  tipoUsuario:string;
  recaptcha: any;

  constructor(private auth:AuthService, private data:DataService) { }
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  Entrar(){
    this.cargarEspecialidades();
    if(this.validacion())
    {
      if(this.tipoIngreso == "paciente")
        {
          this.usuario.tipo="paciente";
          this.auth.registerPaciente(this.usuario,this.img1,this.img2);
        }
        else
        {
          this.usuario.tipo="profesional";
          this.auth.registerProfesional(this.usuario,this.lista,this.img1);
        }
    }
  }
  
  resolved(captchaResponse: any) {
    this.recaptcha = captchaResponse;
  }

  validacion()
  {  
    if(this.usuario.nombre != null && this.usuario.apellido !=null && this.usuario.email !=null && this.usuario.dni !=null && this.usuario.pass !=null && this.clave !=null)
    {
      if(this.usuario.pass == this.clave)
      {
        if(this.tipoIngreso=="paciente")
        {
          if(this.usuario.img1 == null || this.usuario.img2 ==null)
          {
            Swal.fire({
              title:'Error en la carga',
              text:'Debe cargar dos fotos',
              icon:'error',
              confirmButtonText:'Cerrar'
            });
            return false;
          }
        }
        else {
          if(this.usuario.img1 == null)
          {
            Swal.fire({
              title:'Error en la carga',
              text:'Debe cargar una foto',
              icon:'error',
              confirmButtonText:'Cerrar'
            });
            return false;
          }
          if(this.usuario.edad<18){
            Swal.fire({
              title:'Error en la carga',
              text:'El usuario no puede ser menor de edad',
              icon:'error',
              confirmButtonText:'Cerrar'
            });
            return false;
          }
        }

        if(this.tipoIngreso=="profesional")
        {
          if(this.lista.length>0){
            return true;
          }
          else
          { 
            Swal.fire({
              title:'Error en la carga',
              text:'Debe seleccionar al menos una especialidad',
              icon:'error',
              confirmButtonText:'Cerrar'
            });
            return false;
          }
        }
        
      }
      else
      {
        Swal.fire({
          title:'Error en la carga',
          text:'Las contraseñas no coinciden',
          icon:'error',
          confirmButtonText:'Cerrar'
        });
        return false;
      }
    }
    else
    { 
      Swal.fire({
        title:'Error en la carga',
        text:'Datos incompletos o inválidos',
        icon:'error',
        confirmButtonText:'Cerrar'
      });
      return false;
    }
    return true;
  }

  cargarEspecialidades(){
    this.lista = (this.especialidades.filter(res => res.completed == true )).map(res => res.name);
    if(this.nuevaEspecialidad!='' && this.especialidades!=undefined){
      this.lista.push(this.nuevaEspecialidad);
      this.data.AgregarEspecialidad({nombre: this.nuevaEspecialidad, completed: false, color: 'primary'});
    }
    console.info(this.lista);
  }

  ngOnInit(): void {
      this.seleccionado=false;
      this.tipoIngreso="";
      this.data.getEspecialidades().subscribe( res =>{
        res.forEach(item =>{
          let objet = {name: item.nombre, completed: false, color: 'primary'} 
          this.especialidades.push(objet);    
        });
        console.info(this.especialidades);
      }); 

      this.auth.getUserByMail(this.auth.getCurrentUserMail()).then(res =>{
        if(res.length > 0)
        { 
           this.tipoUsuario=res[0].rol;
        }
      }, error=>{
        Swal.fire({
        title:'Error',
        text:'Error al consultar usuario logueado: '+error,
        icon:'error',
        confirmButtonText:'Cerrar'
      });
      })
  }
   
  onFileSelected(event) {
    this.img1 = event.target.files[0];
    this.usuario.img1=" ";
  }

  onFileSelected2(event) {
    this.img2 = event.target.files[0];
    this.usuario.img2=" ";
  }

  updateAllComplete(){
    console.log(this.especialidades);
  }
}
