// src/handlers/getFavorites.ts
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { User } from "../models/user";
import { getUserById, removeFavorite } from "../resolvers/mylistHelpers";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.userId; // Assuming user ID from path
    const favId = event.queryStringParameters?.favId;

    // Validate user ID, limit, and offset (implement validation logic)
    if (!userId || !favId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required parameters." }),
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
    const favorites = await removeFavorite(favId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item removed from list successfully." }), // Include total count for pagination
    };
  } catch (error) {
    console.error("Error while removing from the list:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
