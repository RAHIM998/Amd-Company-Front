export interface AuthResponse {
    user: {
        id: number;
        name: string;
        telephone: string;
        email: string;
        image: string;
        password: string;
        role: string; 
    };
    token: string;
  }