// src/app/store/User.Model.ts
import { User } from '../models/user';

export interface UsersModel {
  list: User[],
  errormessage: string,
  userobj: User;
}
