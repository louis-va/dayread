import request from 'supertest'
import { app, server } from '../../index'
import db from "../config/database";

const agent = request.agent(app);

beforeAll(async () => await db.connect());
afterAll(async () => {
  await db.clear();
  await db.close();
  server.close();
});

describe("auth", () => {
  describe("POST /auth/signup", () => {
    test("Successful", async () => {
      const res = await agent
        .post("/auth/signup")
        .send({ 
          email: "user@test.com",
          password: "testPassword1234!",
          username: "test-user",
          firstname: "Test",
          lastname: "User"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
    });

    test("Email already exists", async () => {
      const res = await agent
        .post("/auth/signup")
        .send({ 
          email: "user@test.com",
          password: "testPassword1234!",
          username: "test-user",
          firstname: "Test",
          lastname: "User"
        });
      expect(res.statusCode).toEqual(409);
    });

    test("Username already exists", async () => {
      const res = await agent
        .post("/auth/signup")
        .send({ 
          email: "user2@test.com",
          password: "testPassword1234!",
          username: "test-user",
          firstname: "Test",
          lastname: "User"
        });
      expect(res.statusCode).toEqual(409);
    });

    test("Password too short", async () => {
      const res = await agent
        .post("/auth/signup")
        .send({ 
          email: "user2@test.com",
          password: "test",
          username: "test-user-2",
          firstname: "Test",
          lastname: "User"
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeTruthy();
    });
  });

  describe("POST /auth/signin", () => {
    test("Successful", async () => {
      const res = await agent
        .post("/auth/signin")
        .send({ 
          email: "user@test.com",
          password: "testPassword1234!",
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
      expect((res: any) => {
        res.body.id,
        res.body.email = "user@test.com",
        res.body.username = "test-user",
        res.body.firstname = "Test",
        res.body.lastname = "User"
      })
    });

    test("Email doesn't exist", async () => {
      const res = await agent
        .post("/auth/signin")
        .send({ 
          email: "user2@test.com",
          password: "testPassword1234!",
        });
      expect(res.statusCode).toEqual(400);
    });

    test("Invalid password", async () => {
      const res = await agent
        .post("/auth/signin")
        .send({ 
          email: "user@test.com",
          password: "testPassword12",
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("POST /auth/signout", () => {
    test("Successful", async () => {
      const res = await agent
        .post("/auth/signout")
      expect(res.statusCode).toEqual(200);
    });
  });
});
