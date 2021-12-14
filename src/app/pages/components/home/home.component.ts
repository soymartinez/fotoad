import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public authService: AuthService,
              public dataService: DataService) { }

  ngOnInit(): void {
    this.getCategorias()
  }
  
  usuarioEmail: string = ''
  imagenes: any[] = []

  getCategorias() {
    this.dataService.getCategoriasDeportes()
      .subscribe((deporte: any[]) => {
        for (let index = 0; index < deporte.length; index++) {

          if (deporte[index].url !== this.imagenes[index]) {
            this.imagenes.push(deporte[index])
            console.log(this.imagenes);
          }
        }
        }
      
      // const data = {
      //   // categoria: deporte.categoria,
      //   // descripcion: deporte.descripcion,
      //   // nombre: deporte.nombre,
      //   url: deporte.url
      //   // visibilidad: deporte.visibilidad
      // }
    )
  }
}
