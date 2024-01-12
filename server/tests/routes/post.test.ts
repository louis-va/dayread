import request from 'supertest'
import { app, server } from '../../index'
import { createSession } from '../config/createSession';
import db from "../config/database";

const agent = request.agent(app);

let sessionCookie = '';

beforeAll(async () => {
  await db.connect()
  sessionCookie = await createSession(agent)
  console.log(sessionCookie)
});

afterAll(async () => {
  await db.clear();
  await db.close();
  server.close();
});

describe("Post endpoints", () => {
  describe("POST /post", () => {
    test("Successful", async () => {
      const res = await agent
        .post("/post")
        .set('Cookie', sessionCookie)
        .send({ 
          content: "Today I ate a delicious apple."
        });
      expect(res.statusCode).toEqual(200);
    });
  });    
});
