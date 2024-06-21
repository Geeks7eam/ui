import path from "path";
import fs from "fs";

import { type PackageJson } from 'type-fest'

export function getPackageInfo(): PackageJson {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('package.json not found');
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
}