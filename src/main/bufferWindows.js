import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export function getExeAssetPath(exeName = exeName) {
  // Check multiple possible locations for exeName
  const possiblePaths = [
    // Development path - in the same directory as this script
    path.join(__dirname, exeName),

    // Production paths
    path.join(process.execPath, '..', 'resources', 'app.asar.unpacked', 'resources', exeName),
    path.join(app.getAppPath(), '..', 'app.asar.unpacked', 'resources', exeName),
    path.join(app.getAppPath(), 'resources', exeName),

    // Direct path to resources directory
    path.join(process.resourcesPath, exeName),
    path.join(process.resourcesPath, 'app.asar.unpacked', 'resources', exeName)
  ];

  // Log all possible paths for debugging
  console.log('Checking possible ' + exeName + ' paths:');
  possiblePaths.forEach(p => console.log(`- ${p} (exists: ${fs.existsSync(p)})`));

  // Return the first path that exists
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      console.log(`Found ${exeName} at: ${p}`);
      return p;
    }
  }

  // If no path exists, return the development path as a fallback
  console.error(exeName + ' not found in any expected location!');
  return path.join(__dirname, exeName);
}

export function parseDeviceName(rawString) {
  const parts = rawString.split(":");

  // Si no hay ":" en el string
  if (parts.length === 1) {
    return {
      name: parts[0].trim(),
      port: null,
    };
  }

  // Si hay más de un ":" (por nombres con ":")
  const port = parts.pop(); // último segmento es el puerto
  const name = parts.join(":"); // el resto es el nombre

  return {
    name: name.trim(),
    port: port.trim(),
  };
}
