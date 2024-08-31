interface IUser {
  name: string;
  email: string
}

interface ILoginRqst {
  email: string;
  password: string
}

interface IRegisterRqst extends IUser {
  password: string
}


interface IUsersObj {
  [key: string]: IUser
}

export type { IUser, IUsersObj, ILoginRqst, IRegisterRqst }