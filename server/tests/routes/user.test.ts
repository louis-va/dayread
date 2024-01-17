import request from 'supertest'
import { app, server } from '../../index'
import { createSession } from '../config/createSession';
import db from "../config/database";

const agent = request.agent(app);

beforeAll(async () => {
  await db.connect()
  await createSession(agent)
});

afterAll(async () => {
  await db.clear();
  await db.close();
  server.close();
});

describe("User endpoints", () => {
  describe("POST /user/:username/follow", () => {
    test("Successful", async () => {
      await agent
        .post("/auth/signup")
        .send({ 
          email: "user@test.com",
          password: "testPassword1234!",
          username: "test-user",
          firstname: "Test",
          lastname: "User"
        });

      const res = await agent
        .post(`/user/test-user/follow`)

      expect(res.statusCode).toEqual(200);
    });

    test("User is already followed", async () => {
      const res = await agent
        .post(`/user/test-user/follow`)
        
      expect(res.statusCode).toEqual(400);
    });

    test("Invalid username", async () => {
      const res = await agent
        .post(`/user/false-user/follow`)
        
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("POST /user/:username/unfollow", () => {
    test("Successful", async () => {
      const res = await agent
        .post(`/user/test-user/unfollow`)

      expect(res.statusCode).toEqual(200);
    });

    test("User is not followed", async () => {
      const res = await agent
        .post(`/user/test-user/unfollow`)
        
      expect(res.statusCode).toEqual(400);
    });

    test("Invalid username", async () => {
      const res = await agent
        .post(`/user/false-user/unfollow`)
        
      expect(res.statusCode).toEqual(404);
    });
  });
});
