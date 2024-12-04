import { Cliente } from './cliente.model'; // Adjust path if Cliente model is elsewhere
import { Pizza } from './pizza.model'; // Adjust path if Pizza model is elsewhere

export interface Pedido {
    id?: string;
    cliente?: Cliente;
    itens?: Pizza[];
    total?: number;
    dataPedido: Date | number; // Altere para 'number' em vez de 'Date'
}