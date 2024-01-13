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
      expect(typeof res.body.id).toBe("string")
      expect(typeof res.body.content).toBe("string")
      expect(typeof res.body.comments).toBe("number")
      expect(typeof res.body.favourites).toBe("number")
      expect(typeof res.body.author.id).toBe("string")
      expect(typeof res.body.author.username).toBe("string")
      expect(typeof res.body.is_comment).toBe("boolean")
      expect(typeof res.body.created_date).toBe("string")
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

  describe("GET /post/:id/comments", () => {
    test("Successful", async () => {
      const postRes = await agent
        .post("/post")
        .send({
          content: "Today I ate a delicious apple."
        });

      await agent
        .post("/post")
        .send({
          content: "Very cool!",
          commented_on: postRes.body.id
        });

      const res = await agent
        .get(`/post/${postRes.body.id}/comments`)

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body[0].id).toBe("string")
      expect(typeof res.body[0].content).toBe("string")
      expect(typeof res.body[0].comments).toBe("number")
      expect(typeof res.body[0].favourites).toBe("number")
      expect(typeof res.body[0].author.id).toBe("string")
      expect(typeof res.body[0].author.username).toBe("string")
      expect(typeof res.body[0].is_comment).toBe("boolean")
      expect(typeof res.body[0].created_date).toBe("string")
    });

    test("No comments", async () => {
      const postRes = await agent
        .post("/post")
        .send({
          content: "Today I ate two delicious apples."
        });

      const res = await agent
        .get(`/post/${postRes.body.id}/comments`)

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true)
    });

    test("Incorrect id", async () => {
      const res = await agent
        .get(`/post/abc123/comments`)
      expect(res.statusCode).toEqual(404);
    });
  });
});
