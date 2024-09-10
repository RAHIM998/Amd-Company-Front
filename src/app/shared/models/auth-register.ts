export interface AuthRegister {
    user: {
        id: number;
        name: string;
        telephone: string;
        email: string;
        image: string;
        password: string;
        role: string; 
    };
    access_token: string;
  }