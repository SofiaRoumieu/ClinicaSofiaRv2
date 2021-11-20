import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    estado_activo:boolean=false;
    mail_usuario?:string; 
    user:any;
    rol?:string;
    constructor(private authSv: AuthService, private router: Router) { }
  
  
    ngOnInit(): void {
      this.authSv.isLoggedIn().subscribe(
        data => {
          this.user = data;
          if(this.user){
            this.estado_activo = true;
            this.mail_usuario=this.authSv.getCurrentUserMail();
          }
          else{ 
            this.estado_activo = false;
            this.mail_usuario='';
          }
  
        },
        err => console.log(err)
      );
    }
  
    async cerrarSesion(){
      try {
        await this.authSv.logout();
        this.estado_activo = false;
      } catch (error) {
        console.log("Error al cerrar sesion" + error);
      }
    } 
  
  
  }