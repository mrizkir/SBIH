#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.startsWith('Grafik') && entry.name.endsWith('.js')) results.push(full);
  }
  return results;
}

const screensDir = path.join(__dirname, '../src/screens');

for (const filePath of walk(screensDir)) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('hasChartData') || content.includes('getLast5YearStats')) continue;

  let changed = false;

  content = content.replace(
    /const sortedData = \[\.\.\.(\w+)\]\.sort\(/g,
    (m, varName) => {
      changed = true;
      return `const sortedData = [...(Array.isArray(${varName}) ? ${varName} : [])].sort(`;
    },
  );

  content = content.replace(
    /const sortedAllData = \[\.\.\.(\w+)\]\.sort\(/g,
    (m, varName) => {
      changed = true;
      return `const sortedAllData = [...(Array.isArray(${varName}) ? ${varName} : [])].sort(`;
    },
  );

  // Guard direct .slice on state variable
  content = content.replace(
    /const last5Years = (\w+)\.slice\(-5\);/g,
    (m, varName) => {
      changed = true;
      return `const last5Years = (Array.isArray(${varName}) ? ${varName} : []).slice(-5);`;
    },
  );

  content = content.replace(
    /const last5Years = sortedData\.slice\(-5\);/g,
    'const last5Years = sortedData.slice(-5);',
  );

  content = content.replace(
    /const last5Years = sortedAllData\.slice\(-5\);/g,
    'const last5Years = sortedAllData.slice(-5);',
  );

  content = content.replace(
    /const last5Years = filteredData\.slice\(-5\);/g,
    'const last5Years = filteredData.slice(-5);',
  );

  content = content.replace(
    /const last5Years = dataFiltered\.slice\(-5\);/g,
    'const last5Years = dataFiltered.slice(-5);',
  );

  // Safe Math.max/min on values array
  if (content.includes('Math.max(...values)') && !content.includes('values.length > 0')) {
    content = content.replace(
      /const maxValue = Math\.max\(\.\.\.values\);/g,
      'const maxValue = values.length > 0 ? Math.max(...values) : 0;',
    );
    content = content.replace(
      /const minValue = Math\.min\(\.\.\.values\);/g,
      'const minValue = values.length > 0 ? Math.min(...values) : 0;',
    );
    content = content.replace(
      /const avgValue = \(values\.reduce\(\(a, b\) => a \+ b, 0\) \/ values\.length\)\.toFixed\((\d+)\);/g,
      'const avgValue = values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed($1) : \'0\';',
    );
    content = content.replace(
      /const latestValue = values\[values\.length - 1\];/g,
      'const latestValue = values.length > 0 ? values[values.length - 1] : 0;',
    );
    changed = true;
  }

  content = content.replace(
    /\{props\.route\.params\.title\}/g,
    '{props.route.params?.title ?? ""}',
  );

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Guarded:', path.relative(screensDir, filePath));
  }
}
