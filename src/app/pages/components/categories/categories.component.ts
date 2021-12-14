import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nombre: string = 'chanchito feliz';

  // Mi idea era que estas categorias estubieran
  // En la base de datos y nosotros solo las recorrieramos
  categorias = [
    'Amigos',
    'Deportes',
    'Familia',
    'Otros'
  ]
}
