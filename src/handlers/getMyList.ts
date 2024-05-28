// src/handlers/getFavorites.ts
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { User } from "../models/user";
import { getUserById, getUserFavorites } from "../resolvers/mylistHelpers";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
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

    const user: User | null = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // Get user's favorites with pagination
    const favorites = await getUserFavorites(userId, limit, offset);

    return {
      statusCode: 200,
      body: JSON.stringify({ favorites, total: favorites.length }), // Include total count for pagination
    };
  } catch (error) {
    console.error("Error while fetching list of favorites:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
