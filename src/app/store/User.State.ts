import { UsersModel } from "./User.Model";

export const userState: UsersModel = {
  list: [],
  errormessage: '',
  userobj: {
    id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    second_last_name: '',
    role: ''
  }
};
