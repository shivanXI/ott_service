const { handler } = require("../src/handlers/removeFromList");
const { Server } = require("serverless-offline");

describe("removeFromList", () => {
  let server;

  beforeAll(async () => {
    server = new Server("./serverless.yml");
    await server.start("-p", 3000); // Start server on port 3000
  });

  afterAll(() => server.stop());

  it("should remove favorite", async () => {
    const userId = "user_id_1";
    const contentId = "f02387a8-7b53-4ed0-b41f-b2ec2f4702a9"; 
    const contentType = "tv_show"; 

    const response = await handler({
      pathParameters: { userId, contentId },
      queryStringParameters: { contentType },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ message: "Item removed from list successfully." });
  });

  it("should handle non-existent favorite", async () => {
    const userId = "user_id_1";
    const contentId = "non_existent_content"; // Assuming non-existent content
    const contentType = "movie"; // Adjust for your actual content type

    const response = await handler({
      pathParameters: { userId, contentId },
      queryStringParameters: { contentType },
    });

    expect(response.statusCode).toBe(404);
  });
});
