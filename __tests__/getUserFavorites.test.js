const { getUserFavorites } = require("../resolvers/mylistHelpers");
const { Server } = require("serverless-offline");

describe("getUserFavorites", () => {
  let server;

  beforeAll(async () => {
    server = new Server("./serverless.yml");
    await server.start("-p", 3000); // Start server on port 3000
  });

  afterAll(() => server.stop());

  it("should return user favorites", async () => {
    const userId = "user_id_1";
    const limit = 10;
    const offset = 0;

    const response = await getUserFavorites(userId, limit, offset);
    expect(response).toBeInstanceOf(Array); // Expect an array of favorites
    expect(response.length).toBeGreaterThanOrEqual(0); // Expect at least 0 favorites
  });

  it("should handle non-existent user", async () => {
    const userId = "non_existent_user";
    const limit = 10;
    const offset = 0;

    try {
      await getUserFavorites(userId, limit, offset);
      fail("Expected error for non-existent user");
    } catch (error) {
      expect(error).toEqual(expect.any(Error)); // Expect an error
    }
  });
});
