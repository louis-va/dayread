/**
 * Setup dotenv to the production, development and test environment.
 * Simplify the use of env variables in the project.
 */

import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT!,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  COOKIE_SECRET: process.env.COOKIE_SECRET!,
  LOGIN_REDIRECT: process.env.LOGIN_REDIRECT!
}