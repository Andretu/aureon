#!/usr/bin/env node
import { spawn } from "child_process";
import path from "node:path";

function run(cmd: string, args: string[], cwd: string) {
  return spawn(cmd, args, { cwd, stdio: "inherit", shell: true });
}

const root = path.join(__dirname, "..", "..");

function serve() {
  console.log("Starting Aureon (FULL TS) in dev mode...");
  run("npm", ["install"], path.join(root, "app-server"));
  run("npm", ["install"], path.join(root, "app-client"));
  // build server before running (so nodemon runs compiled JS)
  run("npm", ["run", "build"], path.join(root, "app-server"));
  run("npm", ["run", "dev"], path.join(root, "app-server"));
  run("npm", ["run", "dev"], path.join(root, "app-client"));
}

function build() {
  console.log("Building Aureon...");
  run("npm", ["run", "build"], path.join(root, "app-server"));
  run("npm", ["run", "build"], path.join(root, "app-client"));
}

function start() {
  console.log("Starting Aureon server (compiled)...");
  run("node", ["dist/server.js"], path.join(root, "app-server"));
}

const cmd = process.argv[2];
switch (cmd) {
  case "serve": serve(); break;
  case "build": build(); break;
  case "start": start(); break;
  default:
    console.log("Usage: aureon [serve|build|start]");
}
