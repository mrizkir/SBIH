#!/usr/bin/env node
/**
 * Adds array validation to all zustand persist state files.
 */
const fs = require('fs');
const path = require('path');

const stateDir = path.join(__dirname, '../src/state');
const files = fs.readdirSync(stateDir).filter((f) => f.startsWith('data') && f.endsWith('.js') && f !== 'persistUtils.js');

for (const file of files) {
  const filePath = path.join(stateDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('persistUtils')) {
    continue;
  }

  const fieldMatch = content.match(/^\s+(\w+):\s*\[\],/m);
  if (!fieldMatch) {
    console.warn('Skip (no array field):', file);
    continue;
  }
  const fieldName = fieldMatch[1];

  const setterMatch = content.match(/set(\w+):\s*\(dataFetch\)\s*=>\s*set\(\{\s*(\w+):\s*dataFetch\s*\}\)/);
  if (!setterMatch) {
    console.warn('Skip (no setter):', file);
    continue;
  }

  content = content.replace(
    "import AsyncStorage from '@react-native-async-storage/async-storage'",
    "import AsyncStorage from '@react-native-async-storage/async-storage'\nimport { createArrayPersistOptions, createArraySetter, normalizeArrayData } from './persistUtils'",
  );

  content = content.replace(
    new RegExp(`set${setterMatch[1]}:\\s*\\(dataFetch\\)\\s*=>\\s*set\\(\\{\\s*${fieldName}:\\s*dataFetch\\s*\\}\\)`),
    `set${setterMatch[1]}: createArraySetter('${fieldName}', set)`,
  );

  content = content.replace(
    /(\{\s*\n\s*name:\s*'[^']+',\s*\n\s*storage:\s*createJSONStorage\(\(\)\s*=>\s*AsyncStorage\),\s*\n\s*)(\}\,\s*\n\s*\)\,\s*\n\))/,
    `$1...createArrayPersistOptions('${fieldName}'),\n        $2`,
  );

  // dataPPB already uses manual normalize - skip duplicate if broken
  if (file === 'dataPPB.js') {
    continue;
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated:', file);
}
