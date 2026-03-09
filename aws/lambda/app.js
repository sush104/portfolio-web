// Reference copy of the Lambda deployed in AWS console as app.mjs

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.EXPERIENCE_TABLE_NAME || "portfolio-experience";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://sush104.github.io";
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const LOCAL_ORIGINS = ["http://localhost:5173"];

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  const origin = (event.headers || {}).origin || (event.headers || {}).Origin || "";
  const allowedOrigin =
    origin === ALLOWED_ORIGIN || LOCAL_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGIN;

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  };

  const method = event.httpMethod || event.requestContext?.http?.method || "";

  if (method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // ── GET /experience ─────────────────────────────────────────────────────────
  if (method === "GET") {
    try {
      const result = await ddb.send(new ScanCommand({ TableName: TABLE }));
      const items = (result.Items || []).sort((a, b) => Number(a.id) - Number(b.id));
      return { statusCode: 200, headers, body: JSON.stringify({ items }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── Admin-only routes ────────────────────────────────────────────────────────
  const adminKey = (event.headers || {})["x-admin-key"] || (event.headers || {})["X-Admin-Key"] || "";
  if (!ADMIN_KEY || adminKey !== ADMIN_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  // ── POST /experience  (create or update) ────────────────────────────────────
  if (method === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      if (!body.id || !body.title || !body.start) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "id, title and start are required" }) };
      }
      // Ensure id is always a string (DynamoDB key type)
      body.id = String(body.id);
      // Ensure description is stored as a list of strings
      if (body.description && !Array.isArray(body.description)) {
        body.description = [body.description];
      }
      // Strip empty description entries
      if (Array.isArray(body.description)) {
        body.description = body.description.filter(Boolean);
      }
      await ddb.send(new PutCommand({ TableName: TABLE, Item: body }));
      return { statusCode: 200, headers, body: JSON.stringify({ item: body }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── DELETE /experience?id=<id> ───────────────────────────────────────────────
  if (method === "DELETE") {
    try {
      const id = (event.queryStringParameters || {}).id;
      if (!id) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "id query param required" }) };
      }
      await ddb.send(new DeleteCommand({ TableName: TABLE, Key: { id: String(id) } }));
      return { statusCode: 200, headers, body: JSON.stringify({ deleted: id }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ message: "Method not allowed" }) };
};
