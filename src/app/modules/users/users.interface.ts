import { Model } from 'mongoose';

type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type Users = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Order[];
};


export interface UserStaticModel extends Model<Users> {
  isUserExists(userId: string): Promise<Users | null>;
}
