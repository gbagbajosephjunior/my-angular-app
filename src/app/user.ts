export interface User {
    id: string;
  username: string;
  password: string;
  status: 'pending' | 'approved';
}
