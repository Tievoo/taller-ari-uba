import { describe, test, expect, spyOn, beforeAll } from "bun:test";
import { login, register } from "./utils";
import { UserModel, type User } from "../users/model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("Auth Utils", () => {
  let mockUsers: {
    validUser: User;
    wrongUser: User;
  };

  beforeAll(async () => {
    process.env.JWT_SECRET = "testsecret";
    
    mockUsers = {
      validUser: {
        id: "123",
        email: "test@example.com",
        password: await bcrypt.hash("password123", 10),
        first_name: "John",
        last_name: "Doe"
      },
      wrongUser: {
        id: "123",
        email: "test@example.com",
        password: await bcrypt.hash("correctpassword", 10),
        first_name: "John",
        last_name: "Doe"
      }
    };
  });

  describe("login", () => {
    test("should return JWT token for valid credentials", async () => {
      const findByEmailSpy = spyOn(UserModel, "findByEmail").mockResolvedValue(mockUsers.validUser);

      const token = await login("test@example.com", "password123");
      
      expect(token).toBeDefined();
      expect(findByEmailSpy).toHaveBeenCalledWith("test@example.com");
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      expect(decoded).toHaveProperty("id", "123");
    });

    test("should throw error for non-existent user", () => {
      const findByEmailSpy = spyOn(UserModel, "findByEmail").mockResolvedValue(null);

      expect(login("nonexistent@example.com", "password")).rejects.toThrow("User not found");
      expect(findByEmailSpy).toHaveBeenCalledWith("nonexistent@example.com");
    });

    test("should throw error for invalid password", () => {
      const findByEmailSpy = spyOn(UserModel, "findByEmail").mockResolvedValue(mockUsers.wrongUser);

      expect(login("test@example.com", "wrongpassword")).rejects.toThrow("Invalid password");
      expect(findByEmailSpy).toHaveBeenCalledWith("test@example.com");
    });
  });

  describe("register", () => {
    test("should create new user and return token", async () => {

      const findByEmailSpy = spyOn(UserModel, "findByEmail").mockResolvedValue(null);
      const createSpy = spyOn(UserModel, "create").mockResolvedValue({ 
        ...mockUsers.validUser,
        id: "456", 
        password: await bcrypt.hash(mockUsers.validUser.password, 10)
      });

      const token = await register(mockUsers.validUser);
      
      expect(token).toBeDefined();
      expect(findByEmailSpy).toHaveBeenCalledWith(mockUsers.validUser.email);
      expect(createSpy).toHaveBeenCalled();
    });

    test("should throw error for duplicate email", async () => {
      const findByEmailSpy = spyOn(UserModel, "findByEmail").mockResolvedValue(mockUsers.validUser);

      expect(register(mockUsers.wrongUser)).rejects.toThrow("Email already in use");
      
      expect(findByEmailSpy).toHaveBeenCalledWith("test@example.com");
    });
  });
});