export const createSession = async (agent: any) => {
  await agent
    .post("/auth/signup")
    .send({ 
      email: "test-user@test.com",
      password: "testPassword1234!",
      username: "test-pseudo",
      firstname: "Test",
      lastname: "User"
    });
  
  const signinRes = await agent
    .post("/auth/signin")
    .send({ 
      email: "test-user@test.com",
      password: "testPassword1234!",
    });

  const cookie = signinRes.headers['set-cookie'][0]
  return cookie
}