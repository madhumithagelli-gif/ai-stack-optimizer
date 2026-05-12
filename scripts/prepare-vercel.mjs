import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "dist", "client", "assets");
const dest = join(root, "public", "assets");

async function copyDir(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  for (const name of await readdir(srcDir)) {
    const srcPath = join(srcDir, name);
    const destPath = join(destDir, name);
    const stats = await stat(srcPath);
    if (stats.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

await rm(dest, { recursive: true, force: true });
await copyDir(src, dest);
console.log("Copied client assets to public/assets for Vercel deployment.");
