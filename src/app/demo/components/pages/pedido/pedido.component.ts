import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/demo/api/pedido.model';
import { Cliente } from 'src/app/demo/api/cliente.model';
import { Pizza } from 'src/app/demo/api/pizza.model';
import { MessageService } from 'primeng/api';
import { PedidoService } from 'src/app/demo/service/pedido.service';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { PizzaService } from 'src/app/demo/service/pizza.service';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './pedido.component.html',
    providers: [MessageService]
})
export class PedidoComponent implements OnInit {

    pedidoDialog: boolean = false;
    deletePedidoDialog: boolean = false;
    deletePedidosDialog: boolean = false;
    pedidos: Pedido[] = [];
    pedido: Pedido = {} as Pedido;
    selectedPedidos: Pedido[] = [];
    submitted: boolean = false;
    cols: any[] = [
        { field: 'cliente.nome', header: 'Cliente' },
        { field: 'itens', header: 'Itens' },
        { field: 'total', header: 'Total' },
        { field: 'dataPedido', header: 'Data do Pedido' }
    ];
    clientes: Cliente[] = [];
    pizzas: Pizza[] = [];
    rowsPerPageOptions = [5, 10, 20];
    errorMessages: string[] = [];

    constructor(
        private clienteService: ClienteService,
        private pizzaService: PizzaService,
        private pedidoService: PedidoService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.loadClientes();
        this.loadPizzas();
        this.loadPedidos();
        // Inicializando a data do pedido com a data atual
        this.pedido.dataPedido = new Date(this.pedido.dataPedido || new Date().getTime());  // Garantir que seja 'Date'
    }

    loadClientes(): void {
        this.clienteService.getClientes().subscribe(data => {
            this.clientes = data;
        });
    }

    loadPizzas(): void {
        this.pizzaService.getPizzas().subscribe(data => {
            this.pizzas = data;
        });
    }

    loadPedidos(): void {
        this.pedidoService.getPedidos().subscribe(data => {
            this.pedidos = data;
        });
    }

    openNew() {
        this.pedido = {
            cliente: null,
            itens: [],
            total: 0,
            dataPedido: new Date()  // Inicializando com um objeto Date
        };
        this.submitted = false;
        this.pedidoDialog = true;
    }
    

    editPedido(pedido: Pedido) {
        this.pedido = { ...pedido };
        this.pedidoDialog = true;
    }

    deleteSelectedPedidos() {
        this.deletePedidosDialog = true;
    }

    deletePedido(pedido: Pedido) {
      // Confirm deletion
      this.deletePedidoDialog = true; // Open confirmation dialog
      this.pedido = { ...pedido }; // Set the cliente to be deleted
  }

    confirmDeleteSelected() {
        this.deletePedidosDialog = false;
        // Aqui você pode chamar o serviço para deletar os pedidos selecionados
        this.selectedPedidos.forEach(pedido => {
            this.pedidoService.deletePedido(pedido.id);
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pedidos Deleted', life: 3000 });
        this.selectedPedidos = [];
    }

    confirmDelete() {
        this.deletePedidoDialog = false;
        this.pedidoService.deletePedido(this.pedido.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pedido Deleted', life: 3000 });
        this.pedido = {} as Pedido;
    }

    hideDialog() {
        this.pedidoDialog = false;
        this.submitted = false;
    }

    savePedido() {
        this.submitted = true;
    
        // Primeiro, calcular o total do pedido
        this.calcularTotal();
    
        // Lista de mensagens de erro
        this.errorMessages = [];
    
        // Verificando os campos obrigatórios e adicionando mensagens de erro
        if (!this.pedido.cliente?.nome?.trim()) {
            this.errorMessages.push('O campo "Cliente" é obrigatório.');
        }
        if (this.pedido.itens.length === 0) {
            this.errorMessages.push('O campo "Itens" é obrigatório.');
        }
        if (this.pedido.total <= 0) {
            this.errorMessages.push('O campo "Total" deve ser maior que zero.');
        }
        if (!this.pedido.dataPedido) {
            this.errorMessages.push('O campo "Data do Pedido" é obrigatório.');
        }
    
        // Se houver mensagens de erro, exibe-as e retorna
        if (this.errorMessages.length > 0) {
            // Exibindo todas as mensagens de erro
            this.messageService.add({
                severity: 'error',
                summary: 'Erro ao salvar pedido',
                detail: this.errorMessages.join(', '),
                life: 3000
            });
            return;
        }
    
        // Se não houver erros, prossegue com o salvamento ou atualização do pedido
        if (this.pedido.id) {
            // Atualizar pedido existente
            this.pedidoService.updatePedido(this.pedido.id, this.pedido).then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Pedido Atualizado',
                    detail: 'O pedido foi atualizado com sucesso!',
                    life: 3000
                });
            });
        } else {
            // Criar novo pedido
            this.pedido.id = this.createId(); // Gerar um ID único para o novo pedido
            this.pedidoService.createPedido(this.pedido).then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Novo Pedido Criado',
                    detail: 'O pedido foi criado com sucesso!',
                    life: 3000
                });
            });
        }
    
        // Atualizar a lista de pedidos
        this.pedidos = [...this.pedidos];
        this.pedidoDialog = false; // Fechar o diálogo
        this.pedido = {
            cliente: null,
            itens: [],
            total: 0,
            dataPedido: null
        }; // Resetar o objeto pedido
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    // Função de adicionar pizza ao pedido
    adicionarPizzaAoPedido(pizza: Pizza) {
        if (pizza.quantity && pizza.quantity > 0) {
            const itemPedido = { ...pizza, quantity: pizza.quantity };
            this.pedido.itens.push(itemPedido);
            this.calcularTotal();  // Atualiza o total
        }
    }

    // Função de calcular o total do pedido
    calcularTotal() {
        this.pedido.total = this.pedido.itens.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // Função de remover item do pedido
    removerItemDoPedido(item: Pizza) {
        const index = this.pedido.itens.indexOf(item);
        if (index > -1) {
            this.pedido.itens.splice(index, 1);
        }
        this.calcularTotal();
    }
}