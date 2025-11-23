import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

// __dirname работает только в CommonJS, поэтому в TS нужно сделать хак:
const __dirname_local = path.dirname(__filename);

export async function serveStatic(app: Express, _server: Server) {
  // путь к фронтенду после сборки на Vercel/локально
  const distPath = path.resolve(__dirname_local, "../client-dist");

  if (!fs.existsSync(distPath)) {
    console.warn(`⚠️ Static folder not found: ${distPath}`);
    return; // сервер всё равно должен работать
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
