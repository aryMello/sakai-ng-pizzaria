export interface MenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    imagePath: string;
  }

  export interface UserI {
    email: string;
    password: string;
    uid: string;
    perfil: 'visitante' | 'admin',
  }
  