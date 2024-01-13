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

describe("Post endpoints", () => {
  describe("POST /post", () => {
    test("Successful", async () => {
      const res = await agent
        .post("/post")
        .send({
          content: "Today I ate a delicious apple."
        });
      expect(res.statusCode).toEqual(200);
    });

    test("Missing content", async () => {
      const res = await agent
        .post("/post")
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("GET /post/:id", () => {
    test("Successful", async () => {
      const postRes = await agent
        .post("/post")
        .send({
          content: "Today I ate a delicious apple."
        });

      const res = await agent
        .get(`/post/${postRes.body.id}`)
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
      expect((res: any) => {
        res.body.id = postRes.body.id,
        res.body.content = "Today I ate a delicious apple.",
        res.body.is_comment = false,
        res.body.commented_on = null
      })
    });

    test("Incorrect id", async () => {
      const res = await agent
        .get(`/post/abc123`)
      expect(res.statusCode).toEqual(404);
    });

    test("Missing id", async () => {
      const res = await agent
        .get(`/post/`)
      expect(res.statusCode).toEqual(404);
    });
  });
});
