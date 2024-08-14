export type TUser = {
  id?: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TNote = {
  __typename: string;
  id: string;
  title: string;
  body: string;
  createdAt: any;
}