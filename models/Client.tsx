export interface Client {
  id: string;
  name: string;
  surname: string;
  phoneNum: string;
  email: string;
  age: number;
  docType: string;
  docNum: string;
  status: boolean;
  addedAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  restoredAt?: Date | null;
}