// src/handlers/addToMyList.ts
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { User } from "../models/user";
import { getUserById, addToFavorites } from "../resolvers/mylistHelpers";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.userId; 
    const contentId = event.queryStringParameters?.contentId; 
    const type = event.queryStringParameters?.type; 

    // Validate user ID and movie ID (implement validation logic)
    if (!userId || !contentId || !type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required parameters" }),
      };
    }

    const user: User | null = await getUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // Add movie to user's favorites
    const result = await addToFavorites(user.id, contentId, type); 
    if (!result){ 
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Already added to favorites" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Content added to favorites." }),
    };
  } catch (error) {
    console.error("Error adding content to list of favorites:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
