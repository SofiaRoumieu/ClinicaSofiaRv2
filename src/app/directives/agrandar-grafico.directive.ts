import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgrandarGrafico]'
})
export class AgrandarGraficoDirective {

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
    console.log("achicar foto")
    this.elemento.nativeElement.style.color= "white";
    this.elemento.nativeElement.style.fontzise= '16px';
  }

  private AgrandarFoto(){
    this.elemento.nativeElement.style.color= "red";
    this.elemento.nativeElement.style.heigth= '40px';
  }
}
