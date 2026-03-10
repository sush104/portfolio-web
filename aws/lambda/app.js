// Reference copy of the Lambda deployed in AWS console as app.mjs

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const EXPERIENCE_TABLE = process.env.EXPERIENCE_TABLE_NAME || "portfolio-experience";
const BLOGS_TABLE = process.env.BLOGS_TABLE_NAME || "portfolio-blogs";
const IMAGES_BUCKET = process.env.IMAGES_BUCKET_NAME || "portfolio-images-sush104";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://sush104.github.io";
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const LOCAL_ORIGINS = ["http://localhost:5173"];

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({ region: process.env.AWS_REGION || "eu-west-2" });

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
  const path = event.path || event.rawPath || "";

  if (method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // ── GET /experience ──────────────────────────────────────────────────────────
  if (method === "GET" && path.includes("experience")) {
    try {
      const result = await ddb.send(new ScanCommand({ TableName: EXPERIENCE_TABLE }));
      const items = (result.Items || []).sort((a, b) => Number(a.id) - Number(b.id));
      return { statusCode: 200, headers, body: JSON.stringify({ items }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── GET /blogs ───────────────────────────────────────────────────────────────
  if (method === "GET" && path.includes("blogs")) {
    try {
      const result = await ddb.send(new ScanCommand({ TableName: BLOGS_TABLE }));
      const items = (result.Items || []).sort((a, b) => new Date(b.date) - new Date(a.date));
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

  // ── POST /experience ─────────────────────────────────────────────────────────
  if (method === "POST" && path.includes("experience")) {
    try {
      const body = JSON.parse(event.body || "{}");
      if (!body.id || !body.title || !body.start) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "id, title and start are required" }) };
      }
      body.id = String(body.id);
      if (body.description && !Array.isArray(body.description)) {
        body.description = [body.description];
      }
      if (Array.isArray(body.description)) {
        body.description = body.description.filter(Boolean);
      }
      await ddb.send(new PutCommand({ TableName: EXPERIENCE_TABLE, Item: body }));
      return { statusCode: 200, headers, body: JSON.stringify({ item: body }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── DELETE /experience ───────────────────────────────────────────────────────
  if (method === "DELETE" && path.includes("experience")) {
    try {
      const id = (event.queryStringParameters || {}).id;
      if (!id) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "id query param required" }) };
      }
      await ddb.send(new DeleteCommand({ TableName: EXPERIENCE_TABLE, Key: { id: String(id) } }));
      return { statusCode: 200, headers, body: JSON.stringify({ deleted: id }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── POST /blogs ──────────────────────────────────────────────────────────────
  if (method === "POST" && path.includes("blogs")) {
    try {
      const body = JSON.parse(event.body || "{}");
      if (!body.id || !body.title || !body.type) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "id, title and type are required" }) };
      }
      body.id = String(body.id);
      body.date = body.date || new Date().toISOString().split("T")[0];
      if (body.tags && !Array.isArray(body.tags)) {
        body.tags = body.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
      await ddb.send(new PutCommand({ TableName: BLOGS_TABLE, Item: body }));
      return { statusCode: 200, headers, body: JSON.stringify({ item: body }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── DELETE /blogs ────────────────────────────────────────────────────────────
  if (method === "DELETE" && path.includes("blogs")) {
    try {
      const id = (event.queryStringParameters || {}).id;
      if (!id) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "id query param required" }) };
      }
      await ddb.send(new DeleteCommand({ TableName: BLOGS_TABLE, Key: { id: String(id) } }));
      return { statusCode: 200, headers, body: JSON.stringify({ deleted: id }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  // ── GET /upload-url (admin only — presigned S3 PUT) ─────────────────────────
  if (method === "GET" && path.includes("upload-url")) {
    const filename = (event.queryStringParameters || {}).filename || "upload";
    const contentType = (event.queryStringParameters || {}).contentType || "image/jpeg";
    const key = `blog-images/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    try {
      const command = new PutObjectCommand({
        Bucket: IMAGES_BUCKET,
        Key: key,
        ContentType: contentType,
      });
      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
      const publicUrl = `https://${IMAGES_BUCKET}.s3.eu-west-2.amazonaws.com/${key}`;
      return { statusCode: 200, headers, body: JSON.stringify({ uploadUrl, publicUrl }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: err.message }) };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ message: "Method not allowed" }) };
};
