export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];

export const addUser = (user: User): User => {
  users.push(user);
  return user;
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const validateUser = (email: string, password: string): boolean => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user !== undefined;
};
