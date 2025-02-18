export type UserType = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthType = {
  token: string;
  user: UserType;
};
