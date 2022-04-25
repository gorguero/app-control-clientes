import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  cliente:Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  constructor(private clientesServicio:ClienteServicio, private flashMessagess:FlashMessagesService) { }

  ngOnInit(): void {

    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );

  }

  getSaldoTotal(){

    let saldoTotal:number = 0;
  
    if(this.clientes){
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      })
    }

    return saldoTotal;

  }

  agregar({value, valid}:{value:Cliente, valid: boolean}){

    if(!valid){

      this.flashMessagess.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });

    }else{

      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);

    }

  }

}
