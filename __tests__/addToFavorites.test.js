const { handler } = require("../src/handlers/addToMyList");

describe("addToFavorites", () => {
  it("should add favorite", async () => {
    const userId = "user_id_1";
    const contentId = "new_content_id_101";
    const contentType = "movie";

    const response = await handler({
      body: JSON.stringify({ userId, contentId, contentType }),
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ message: "Content added to favorites." });
  });

  it("should handle already existing favorite", async () => {
    const userId = "user_id_1"; // Assuming this favorite already exists
    const contentId = "new_content_id_101";
    const contentType = "movie";

    const response = await handler({
      body: JSON.stringify({ userId, contentId, contentType }),
    });

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ message: "Already added to favorites" });
  });
});
