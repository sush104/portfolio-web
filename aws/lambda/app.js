// AWS SDK v3 — built into Lambda Node.js 18, no install needed
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.EXPERIENCE_TABLE_NAME || "portfolio-experience";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://sush104.github.io";
const LOCAL_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
];

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  const origin = (event.headers || {}).origin || (event.headers || {}).Origin || "";
  const allowedOrigin =
    origin === ALLOWED_ORIGIN || LOCAL_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGIN;

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
  };

  if ((event.httpMethod || event.requestContext?.http?.method) === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const result = await ddb.send(new ScanCommand({ TableName: TABLE }));
    const items = (result.Items || []).sort((a, b) => Number(a.id) - Number(b.id));
    return { statusCode: 200, headers, body: JSON.stringify({ items }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
  }
};
