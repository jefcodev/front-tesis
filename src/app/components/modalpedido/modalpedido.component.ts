import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalpedido',
  templateUrl: './modalpedido.component.html',
  styleUrls: ['./modalpedido.component.scss']
})
export class ModalpedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showModal = false;
}
