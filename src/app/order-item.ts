import { MenuItem } from "./menu-item";

export interface OrderItem {
    id?: string;
    items: MenuItem[];
    totalPrice: number;
    status: string;
    Email: string;
    User: string;
    telf: string;
  }