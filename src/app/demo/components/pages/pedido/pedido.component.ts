import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/demo/api/pedido.model';
import { Cliente } from 'src/app/demo/api/cliente.model';
import { Pizza } from 'src/app/demo/api/pizza.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PedidoService } from 'src/app/demo/service/pedido.service';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { PizzaService } from 'src/app/demo/service/pizza.service';

@Component({
    templateUrl: './pedido.component.html',
    providers: [MessageService]
})
export class PedidoComponent implements OnInit {

    pedidoDialog: boolean = false;

    deletePedidoDialog: boolean = false;

    deletePedidosDialog: boolean = false;

    pedidos: Pedido[] = [];

    clientes: Cliente[] = []; // Lista de clientes

    pizzas: Pizza[] = []; // Lista de pizzas

    pedido: Pedido = this.createEmptyPedido();

    selectedPedidos: Pedido[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private pedidoService: PedidoService, 
        private clienteService: ClienteService, 
        private pizzaService: PizzaService, 
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.pedidoService.getPedidos().subscribe(data => this.pedidos = data);
        this.clienteService.getClientes().subscribe(data => this.clientes = data); // Carregar clientes
        this.pizzaService.getPizzas().subscribe(data => this.pizzas = data); // Carregar pizzas

        this.cols = [
            { field: 'cliente.nome', header: 'Cliente' },
            { field: 'total', header: 'Total' },
            { field: 'dataPedido', header: 'Data do Pedido' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.pedido = this.createEmptyPedido();
        this.submitted = false;
        this.pedidoDialog = true;
    }

    deleteSelectedPedidos() {
        this.deletePedidosDialog = true;
    }

    editPedido(pedido: Pedido) {
        this.pedido = { ...pedido };
        this.pedidoDialog = true;
    }

    deletePedido(pedido: Pedido) {
        this.deletePedidoDialog = true;
        this.pedido = { ...pedido };
    }

    confirmDeleteSelected() {
        this.deletePedidosDialog = false;
        this.pedidoService.deletePedido(this.pedido.id).then(() => {
            this.pedidos = this.pedidos.filter(val => !this.selectedPedidos.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pedidos Deleted', life: 3000 });
            this.selectedPedidos = [];
        });
    }

    confirmDelete() {
        this.deletePedidoDialog = false;
        this.pedidoService.deletePedido(this.pedido.id).then(() => {
            this.pedidos = this.pedidos.filter(val => val.id !== this.pedido.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pedido Deleted', life: 3000 });
            this.pedido = this.createEmptyPedido();
        });
    }

    hideDialog() {
        this.pedidoDialog = false;
        this.submitted = false;
    }

    savePedido() {
        this.submitted = true;

        if (this.pedido.cliente && this.pedido.cliente.nome && this.pedido.itens && this.pedido.itens.length > 0) {
            if (this.pedido.id) {
                this.pedidoService.updatePedido(this.pedido.id, this.pedido).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pedido Updated', life: 3000 });
                    this.pedidos = this.pedidos.map(val => val.id === this.pedido.id ? this.pedido : val);
                });
            } else {
                this.pedido.id = this.createId();
                this.pedidoService.createPedido(this.pedido).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pedido Created', life: 3000 });
                    this.pedidos.push({ ...this.pedido });
                });
            }

            this.pedidos = [...this.pedidos];
            this.pedidoDialog = false;
            this.pedido = this.createEmptyPedido();
        } else {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Erro', 
                detail: 'Cliente e pelo menos uma pizza são obrigatórios.', 
                life: 3000 
            });
        }
    }

    createEmptyPedido(): Pedido {
        return {
            cliente: {
                nome: '',
                rua: '',
                bairro: '',
                numero: 0,
                cidade: '',
                estado: '',
                cep: '',
                telefone: '',
                id: '',
                key: '',
                cpf: '',
                sexo: 'Outro'
            },
            itens: [],
            total: 0,
            dataPedido: new Date()
        };
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.pedidos.length; i++) {
            if (this.pedidos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}