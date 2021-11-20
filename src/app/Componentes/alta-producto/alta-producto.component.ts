import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ApiService } from 'src/app/services/api.service';
import { ProductosService } from 'src/app/services/productos.service';
import {Producto} from '../../clases/producto';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {

  codigo: string;
  descripcion: string;
 // tipo: Tipo;
  precio: string;
  stock: number;
  paisOrigen: string;
  comestible: boolean;

  basePath = '/images';                       //  <<<<<<<
  downloadableURL = '';                      //  <<<<<<<
  //task: AngularFireUploadTask;
  //progressValue: Observable<number>;

  constructor(private api: ApiService,private productoService: ProductosService, private fireStorage: AngularFireStorage/*, private toastr: ToastrService*/) { }

  ngOnInit(): void {
    /*let today = new Date();
    let todayStr = today.toString()
    let dd = today.getDate();
    let ddStr = dd.toString();
    let mm = today.getMonth() + 1; //January is 0!
    let mmStr = mm.toString(); //January is 0!
    let yyyy = today.getFullYear();
    let yyyyStr = yyyy.toString();

    if (dd < 10) {
      ddStr = '0' + ddStr;
    }

    if (mm < 10) {
      mmStr = '0' + mmStr;
    }

    todayStr = yyyyStr + '-' + mmStr + '-' + ddStr;
    document.getElementById("start").setAttribute("max", todayStr);

    let select = (<HTMLSelectElement>document.getElementById("tipo"));
    for (let tipo in Tipo) {
      select.options[select.options.length] = new Option(tipo);
    }*/

  }

  /*cambiarActor(actor: Actor) {
    this.actorId = actor.id;
    this.actorNombre = actor.nombre + ' ' + actor.apellido;
  }*/

  guardarProducto() {
    let producto = new Producto(this.descripcion, this.precio, this.stock, this.paisOrigen, this.comestible);
    this.productoService.guardarProducto(producto).then(resp => {
      this.showSuccess();
    }).catch((error) => {
      this.showError(error);
    });
  }

  /*async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file);    // upload task

      this.progressValue = this.task.percentageChanges();       // <<<<< Percentage of uploading is given
      (await this.task).ref.getDownloadURL().then(url => { this.downloadableURL = url; });  // <<< url is found here
    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }
  }
*/
  showSuccess() {
    console.log('Se guardó correctamente');
   // this.toastr.success('Se guardó correctamente');
  }

  showError(error: any) {
    console.log('Algo salió mal. Error: ' + error);
    //this.toastr.error('Algo salió mal. Error: ' + error);
  }

  
  cambiarPais(paisNombre:string){
    this.paisOrigen=paisNombre;
  }
}
