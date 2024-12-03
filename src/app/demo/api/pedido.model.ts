import { Cliente } from './cliente.model'; // Importe a entidade Cliente
import { Pizza } from './pizza.model'; // Importe a entidade Produto

export interface Pedido {
    id?: string;
    cliente: Cliente; // Relacionamento com a entidade Cliente
    itens: Pizza[]; // Lista de Produtos (entidade Produto)
    total: number; // Total (Numérico)
    dataPedido: Date; // Data do Pedido (Data)
}