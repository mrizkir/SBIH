#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const stateDir = path.join(__dirname, '../src/state');
const files = fs.readdirSync(stateDir).filter((f) => f.startsWith('data') && f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(stateDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('createArraySetter')) continue;
  if (content.includes('...createArrayPersistOptions')) continue;

  const fieldMatch = content.match(/createArraySetter\('(\w+)'/);
  if (!fieldMatch) {
    console.warn('No field for merge:', file);
    continue;
  }
  const fieldName = fieldMatch[1];

  content = content.replace(
    /storage: createJSONStorage\(\(\) => AsyncStorage\),[^\n]*\n(\s+)\},/,
    `storage: createJSONStorage(() => AsyncStorage),\n$1...createArrayPersistOptions('${fieldName}'),\n$1},`,
  );

  content = content.replace(
    ", normalizeArrayData } from './persistUtils'",
    " } from './persistUtils'",
  );

  fs.writeFileSync(filePath, content);
  console.log('Added merge:', file);
}
