import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cliente } from "../modelo/cliente.model";

@Injectable()
export class ClienteServicio{

    clientesCollection: AngularFirestoreCollection<Cliente>;
    clienteDoc:AngularFirestoreDocument<Cliente>;
    clientes:Observable<Cliente[]>;
    cliente:Observable<Cliente>;

    constructor(private db:AngularFirestore){
        this.clientesCollection = db.collection('clientes', ref => ref.orderBy('nombre', 'asc')); //Recuperamos la coleccion de clientes
    }

    getClientes():Observable<Cliente[]>{

        //Obtener los clientes
        this.cliente = this.clientesCollection.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map( accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );

        return this.clientes;

    }

}

