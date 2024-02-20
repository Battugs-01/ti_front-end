export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  user: Admin;
}

export interface Admin {
  email: string;
  first_name: string;
  id: string;
  lastName: string;
  position: string;
}
