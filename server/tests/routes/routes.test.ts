import request from 'supertest'
import { app, server } from '../../index'
import db from "../config/database";
import testAuth from './testAuth';

const agent = request.agent(app);

beforeAll(async () => await db.connect());
afterAll(async () => {
  await db.clear();
  await db.close();
  server.close();
});

testAuth(agent);
