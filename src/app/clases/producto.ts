export class Producto {
    codigo: string;
    descripcion: string;
    precio: string;
    stock: number;
    paisOrigen: string;
    comestible: boolean;

    constructor(descripcion: string, precio: string, stock: number, paisOrigen: string, comestible: boolean) {
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.paisOrigen = paisOrigen;
        this.comestible = comestible;
    }
}

