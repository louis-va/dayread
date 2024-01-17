export const createSession = async (agent: any) => {
  await agent
    .post("/auth/signup")
    .send({ 
      email: "global-test-user@test.com",
      password: "testPassword1234!",
      username: "global-test-pseudo",
      firstname: "Global",
      lastname: "User"
    });
  
  const signinRes = await agent
    .post("/auth/signin")
    .send({ 
      email: "global-test-user@test.com",
      password: "testPassword1234!",
    });

  const cookie = signinRes.headers['set-cookie'][0]
  return cookie
}