import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEstadoTurno]'
})
export class EstadoTurnoDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.AgrandarFoto();
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.AchicarFoto();
  }
  constructor(private elemento:ElementRef) { 
   console.log(elemento);
  }

  private AchicarFoto(){
    console.log("agrandarfoto")
    this.elemento.nativeElement.style.zindex= 1;
    this.elemento.nativeElement.style.width='120px';
    this.elemento.nativeElement.style.height='120px';
  }

  private AgrandarFoto(){
    console.log("achicarFoto")
    console.log(Number(this.elemento.nativeElement.style.width)+'px')
    this.elemento.nativeElement.style.zindex= 1000;
    this.elemento.nativeElement.style.width= '180px';
    this.elemento.nativeElement.style.height='180px';
  }
}
