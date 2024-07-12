import { addUser, getUserByEmail, validateUser, User } from "../user";

describe("User Module", () => {
  it("should add a user", () => {
    const user: User = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    };
    const addedUser = addUser(user);
    expect(addedUser).toEqual(user);
  });

  it("should get a user by email", () => {
    const user: User = {
      id: "2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password",
    };
    addUser(user);
    const fetchedUser = getUserByEmail("jane.doe@example.com");
    expect(fetchedUser).toEqual(user);
  });

  it("should validate user credentials", () => {
    const user: User = {
      id: "3",
      name: "Mark Smith",
      email: "mark.smith@example.com",
      password: "password",
    };
    addUser(user);
    const isValid = validateUser("mark.smith@example.com", "password");
    expect(isValid).toBe(true);
  });

  it("should not validate incorrect user credentials", () => {
    const isValid = validateUser("non.existent@example.com", "wrongpassword");
    expect(isValid).toBe(false);
  });
});
