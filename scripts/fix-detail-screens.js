#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.startsWith('Detail') && entry.name.endsWith('.js')) results.push(full);
  }
  return results;
}

const screensDir = path.join(__dirname, '../src/screens');
const detailFiles = walk(screensDir).filter((f) => !f.includes('DetailDashboard'));

const getStatusColorBlock = /const getStatusColor = \(status\) => \{[\s\S]*?\};\n\n/;

for (const filePath of detailFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!getStatusColorBlock.test(content)) continue;

  content = content.replace(getStatusColorBlock, '');

  if (content.includes("from '../../../constants/Helper'")) {
    content = content.replace(
      /import \{([^}]+)\} from '\.\.\/\.\.\/\.\.\/constants\/Helper'/,
      (m, imports) => {
        const parts = imports.split(',').map((s) => s.trim()).filter(Boolean);
        if (!parts.includes('getStatusColor')) parts.push('getStatusColor');
        if (!parts.includes('sortByTahunDesc')) parts.push('sortByTahunDesc');
        return `import { ${parts.join(', ')} } from '../../../constants/Helper'`;
      },
    );
  } else if (content.includes("from '../../constants/Helper'")) {
    content = content.replace(
      /import \{([^}]+)\} from '\.\.\/\.\.\/constants\/Helper'/,
      (m, imports) => {
        const parts = imports.split(',').map((s) => s.trim()).filter(Boolean);
        if (!parts.includes('getStatusColor')) parts.push('getStatusColor');
        if (!parts.includes('sortByTahunDesc')) parts.push('sortByTahunDesc');
        return `import { ${parts.join(', ')} } from '../../constants/Helper'`;
      },
    );
  }

  // Fix unsafe spread sort patterns
  content = content.replace(
    /const sortedData = \[\.\.\.\([^)]+\|\| \[\]\)\]\.sort\(\(a, b\) => b\.tahun - a\.tahun\);/g,
    'const sortedData = sortByTahunDesc($1);'.replace('$1', (m) => {
      const inner = m.match(/\[\.\.\.\(([^|]+)\|\| \[\]\)\]/);
      return inner ? inner[1].trim() : 'data';
    }),
  );

  // Simpler replacement for common pattern
  content = content.replace(
    /const sortedData = \[\.\.\.\((\w+)\s*\|\|\s*\[\]\)\]\.sort\(\(a, b\) => b\.tahun - a\.tahun\);/g,
    'const sortedData = sortByTahunDesc($1);',
  );

  // useMemo blocks that only check falsy, not array
  content = content.replace(
    /if \(!(\w+)\) return \[\];\s*\n\s*return \[\.\.\.\1\]\.sort\(/g,
    'if (!Array.isArray($1)) return [];\n    return [...$1].sort(',
  );

  // route.params.title -> safe access
  content = content.replace(
    /\{props\.route\.params\.title\}/g,
    '{props.route.params?.title ?? ""}',
  );

  fs.writeFileSync(filePath, content);
  console.log('Updated detail:', path.relative(screensDir, filePath));
}
