export interface UserPayload {
  sub: string;
  name: string;
  email: string;
  avatar?: string;
  is_active?: boolean;
  iat?: number;
  exp?: number;
}
