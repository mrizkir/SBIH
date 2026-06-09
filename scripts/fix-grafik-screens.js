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

const blockPattern =
  /\/\/ Ambil 5 tahun terakhir[^\n]*\n\s*const last5Years = ([^;]+);\s*\n\s*\/\/ Hitung statistik[^\n]*\n\s*const values = last5Years\.map\(item => parseFloat\(item\.(\w+)\)\);\s*\n\s*const maxValue = Math\.max\(\.\.\.values\);\s*\n\s*const minValue = Math\.min\(\.\.\.values\);\s*\n\s*const avgValue = \(values\.reduce\(\(a, b\) => a \+ b, 0\) \/ values\.length\)\.toFixed\((\d+)\);\s*\n\s*const latestValue = values\[values\.length - 1\];/;

const screensDir = path.join(__dirname, '../src/screens');
const grafikFiles = walk(screensDir);

for (const filePath of grafikFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('hasChartData')) continue;

  const match = content.match(blockPattern);
  if (!match) {
    console.log('Skip (pattern):', path.relative(screensDir, filePath));
    continue;
  }

  const [, dataExpr, valueKey, decimals] = match;

  if (!content.includes('getLast5YearStats')) {
    content = content.replace(
      /import \{([^}]+)\} from '\.\.\/\.\.\/\.\.\/constants\/Helper'/,
      (m, imports) => {
        const parts = imports.split(',').map((s) => s.trim()).filter(Boolean);
        if (!parts.includes('getLast5YearStats')) parts.push('getLast5YearStats');
        return `import { ${parts.join(', ')} } from '../../../constants/Helper'`;
      },
    );
  }

  const replacement = `const chartStats = getLast5YearStats(${dataExpr.trim()}, '${valueKey}');
  const { last5Years, values, hasChartData, maxValue, minValue, latestValue } = chartStats;
  const avgValue = hasChartData
    ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(${decimals})
    : '${'0'.padEnd(parseInt(decimals, 10) + 1, '0').replace(/^0/, '0')}';`;

  // Fix avgValue fallback for decimals
  const zeroFallback = decimals === '2' ? "'0.00'" : "'0'";

  const finalReplacement = `const chartStats = getLast5YearStats(${dataExpr.trim()}, '${valueKey}');
  const { last5Years, values, hasChartData, maxValue, minValue, latestValue } = chartStats;
  const avgValue = hasChartData
    ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(${decimals})
    : ${zeroFallback};`;

  content = content.replace(blockPattern, finalReplacement);

  content = content.replace(
    /\{props\.route\.params\.title\}/g,
    '{props.route.params?.title ?? ""}',
  );

  // Wrap LineChart section - find stats container and chart
  if (!content.includes('hasChartData ?')) {
    content = content.replace(
      /(\/\* Statistics Cards \*\/\s*\n\s*)<View style=\{styles\.statsContainer\}>/,
      '$1{hasChartData ? (\n        <View style={styles.statsContainer}>',
    );

    // After stats container closing, before chart card comment
    content = content.replace(
      /(<\/View>\s*\n\s*)(\/\* Chart Card \*\/\s*\n\s*<View style=\{styles\.chartCard\}>)/,
      `$1) : (
          <View style={styles.emptyState}>
            <Icon name="bar-chart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia untuk grafik</Text>
          </View>
        )}

        {hasChartData && (
        $2`,
    );

    // Close chart card conditional before trend analysis
    content = content.replace(
      /(<\/View>\s*\n\s*)(\/\* Trend Analysis \*\/)/,
      `$1)}

        $2`,
    );

    // Wrap trend analysis
    content = content.replace(
      /(\/\* Trend Analysis \*\/\s*\n\s*)<View style=\{styles\.trendCard\}>/,
      '{hasChartData && (\n        <View style={styles.trendCard}>',
    );

    // Close trend before info card - tricky, add before last info card comment if exists
    content = content.replace(
      /(<\/View>\s*\n\s*)(\/\* Info Card \*\/)/,
      `$1)}

        $2`,
    );

    // Add empty state styles if missing
    if (!content.includes('emptyState:')) {
      content = content.replace(
        /scrollContent: \{\s*\n\s*padding: 16,/,
        `emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,`,
      );
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated grafik:', path.relative(screensDir, filePath));
}
