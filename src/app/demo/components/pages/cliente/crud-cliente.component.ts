import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/demo/api/cliente.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { from } from 'rxjs'; // Importe a função from

@Component({
    templateUrl: './cliente.component.html',
    providers: [MessageService]
})
export class CrudClienteComponent implements OnInit {

    clienteDialog: boolean = false;

    deleteClienteDialog: boolean = false;

    deleteClientesDialog: boolean = false;

    clientes: Cliente[] = [];

    cliente: Cliente = this.createEmptyCliente();

    selectedClientes: Cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    sexos: any[] = []; // Adicione esta linha

    rowsPerPageOptions = [5, 10, 20];

    constructor(private clienteService: ClienteService, private messageService: MessageService) { }

    ngOnInit() {
        this.clienteService.getClientes().subscribe(data => this.clientes = data);

        this.cols = [
            { field: 'product', header: 'Cliente' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.sexos = [
            { label: 'Masculino', value: 'Masculino' },
            { label: 'Feminino', value: 'Feminino' },
            { label: 'Outro', value: 'Outro' }
        ]; // Adicione esta parte
    }

    openNew() {
        this.cliente = this.createEmptyCliente();
        this.submitted = false;
        this.clienteDialog = true;
    }

    deleteSelectedClientes() {
        this.deleteClientesDialog = true;
    }

    editCliente(cliente: Cliente) {
        this.cliente = { ...cliente };
        this.clienteDialog = true;
    }

    deleteCliente(cliente: Cliente) {
        this.deleteClienteDialog = true;
        this.cliente = { ...cliente };
    }

    confirmDeleteSelected() {
        this.deleteClientesDialog = false;
        from(this.clienteService.deleteCliente(this.cliente.key)).subscribe(() => {
            this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes Deleted', life: 3000 });
            this.selectedClientes = [];
        });
    }

    confirmDelete() {
        this.deleteClienteDialog = false;
        from(this.clienteService.deleteCliente(this.cliente.key)).subscribe(() => {
            this.clientes = this.clientes.filter(val => val.id !== this.cliente.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Deleted', life: 3000 });
            this.cliente = this.createEmptyCliente();
        });
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveCliente() {
        this.submitted = true;

        if (this.cliente.nome?.trim()) {
            if (this.cliente.id) {
                from(this.clienteService.updateCliente(this.cliente.key, this.cliente)).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Updated', life: 3000 });
                    this.clientes = this.clientes.map(val => val.id === this.cliente.id ? this.cliente : val);
                });
            } else {
                this.cliente.id = this.createId();
                from(this.clienteService.createCliente(this.cliente)).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Created', life: 3000 });
                    this.clientes.push({ ...this.cliente }); // Adicione uma cópia do cliente
                });
            }

            this.clientes = [...this.clientes];
            this.clienteDialog = false;
            this.cliente = this.createEmptyCliente();
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Nome é obrigatório', life: 3000 });
        }
    }

    createEmptyCliente(): Cliente {
        return {
            nome: '',
            cep: '',
            telefone: '',
            id: '',
            key: '',
            cpf: '',
            sexo: 'Masculino'
        };
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].id === id) {
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