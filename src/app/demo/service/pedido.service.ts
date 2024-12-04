import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../api/pedido.model';

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    private basePath = 'pedido';

    constructor(private db: AngularFireDatabase) {}

    // Criar pedido
    createPedido(pedido: Pedido): any {
        // Armazene a data como milissegundos, se não estiver definida
        if (!(pedido.dataPedido instanceof Date)) {
            pedido.dataPedido = pedido.dataPedido || new Date().getTime(); // Armazenando como milissegundos
        } else {
            pedido.dataPedido = pedido.dataPedido.getTime(); // Converte para milissegundos se for um Date
        }
        return this.db.list<Pedido>(this.basePath).push(pedido);
    }

    // Obter todos os pedidos
    getPedidos() {
        return this.db
            .list<Pedido>(this.basePath)
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    changes.map((c) => {
                        const pedido = { key: c.payload.key, ...c.payload.val() };
                        // Converte 'dataPedido' de milissegundos para 'Date' ao exibir
                        if (pedido.dataPedido) {
                            pedido.dataPedido = new Date(pedido.dataPedido); // Converte para 'Date' ao exibir
                        }
                        return pedido;
                    })
                )
            );
    }

    // Obter pedido por ID
    getPedidoId(key: string): Observable<Pedido> {
        return this.db.object<Pedido>(`${this.basePath}/${key}`).valueChanges();
    }

    // Atualizar pedido
    updatePedido(key: string, value: any): Promise<void> {
        // Verifica se a dataPedido precisa ser convertida
        if (value.dataPedido instanceof Date) {
            value.dataPedido = value.dataPedido.getTime(); // Converte para milissegundos
        }
        return this.db.object<Pedido>(`${this.basePath}/${key}`).update(value);
    }

    // Deletar pedido
    deletePedido(key: string): Promise<void> {
        return this.db.object<Pedido>(`${this.basePath}/${key}`).remove();
    }
}
