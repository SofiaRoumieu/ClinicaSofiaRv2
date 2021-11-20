import { Injectable } from '@angular/core';
import {Producto} from '../clases/producto';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos;

  constructor(private firestore: AngularFirestore) {
    this.productos = this.firestore.collection("productos").snapshotChanges();
  }

  getProductos() {
    return this.firestore.collection("productos").snapshotChanges();
  }

  getProducto(key: string) {
    return this.firestore.collection("productos").doc(key).valueChanges();
  }


  guardarProducto(producto: Producto) {
    return this.firestore.collection("productos").add({
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      paisOrigen: producto.paisOrigen,
      comestible: producto.comestible
    });
}
}
