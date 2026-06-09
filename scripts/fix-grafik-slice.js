#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.endsWith('.js')) results.push(full);
  }
  return results;
}

for (const filePath of walk(path.join(__dirname, '../src'))) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('getLast5YearStats') || !content.includes('.slice(-5)')) continue;
  const next = content.replace(/getLast5YearStats\(([^)]+)\.slice\(-5\)/g, 'getLast5YearStats($1');
  if (next !== content) {
    fs.writeFileSync(filePath, next);
    console.log('Fixed slice:', path.relative(path.join(__dirname, '..'), filePath));
  }
}
