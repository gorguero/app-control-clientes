import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente:Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id:string;

  constructor(private clientesServicio:ClienteServicio, 
    private flashMessagess:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe( (cliente: Cliente) => {
      this.cliente = cliente;
    });
  }

  guardar(clienteDesdeForm:Cliente){
  
    if(!clienteDesdeForm){

      this.flashMessagess.show('Por favor llena el formulario correctamente',{
        cssClass: 'aler-danger', timeout: 4000
      });

    }else{

      clienteDesdeForm.id = this.id;

      //Modificar el cliente
      this.clientesServicio.modificarCliente(clienteDesdeForm);
      this.router.navigate(['/']);

    }

  }

  eliminar(){
    
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }

  }

}
