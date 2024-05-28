"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mylistHelpers_1 = require("../../resolvers/mylistHelpers");
const handler = async (event) => {
    const userId = event.pathParameters?.userId; // Assuming user ID from path
    const limit = parseInt(event.queryStringParameters?.limit || "10"); // Default limit
    const offset = parseInt(event.queryStringParameters?.offset || "0"); // Default offset
    // Validate user ID, limit, and offset (implement validation logic)
    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing required parameter: userId" }),
        };
    }
    const user = await (0, mylistHelpers_1.getUserById)(userId);
    if (!user) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "User not found" }),
        };
    }
    // Get user's favorites with pagination
    const favorites = await (0, mylistHelpers_1.getUserFavorites)(userId, limit, offset);
    return {
        statusCode: 200,
        body: JSON.stringify({ favorites, total: favorites.length }), // Include total count for pagination
    };
};
exports.handler = handler;
