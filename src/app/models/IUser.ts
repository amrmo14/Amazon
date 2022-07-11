export interface IUser {
  id: number;
  national_id: number;
  name: string;
  email: string;
  password: string;
  cardId?: string;
  status: string;
}
