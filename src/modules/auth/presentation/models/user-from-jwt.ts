export interface UserFromJwt {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  is_active?: boolean;
}
