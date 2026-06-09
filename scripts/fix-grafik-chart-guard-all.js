#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const EMPTY_CHART = `{hasChartData ? (
$CHART
            ) : (
              <View style={styles.emptyState}>
                <Icon name="bar-chart-outline" size={64} color="#ccc" />
                <Text style={styles.emptyText}>Belum ada data tersedia untuk grafik</Text>
              </View>
            )}`;

const EMPTY_SCROLL = `
        {!hasChartData && (
          <View style={styles.emptyState}>
            <Icon name="bar-chart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia untuk grafik</Text>
          </View>
        )}`;

const EMPTY_STYLES = `emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,`;

function addEmptyStyles(content) {
  if (content.includes('emptyState:')) return content;
  if (content.includes('scrollContent:')) {
    return content.replace(/scrollContent: \{\s*\n\s*padding: 16,/, EMPTY_STYLES);
  }
  if (content.includes('noDataContainer:')) {
    return content.replace(
      /noDataContainer: \{/,
      `emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  noDataContainer: {`,
    );
  }
  return content;
}

function ensureHasChartData(content, source = 'last5Years') {
  if (content.includes('const hasChartData')) return content;
  const re = new RegExp(`(const ${source} = [^\\n]+\\n)`);
  if (re.test(content)) {
    return content.replace(re, `$1  const hasChartData = ${source}.length > 0;\n`);
  }
  return content;
}

function wrapChartWrapperLineChart(content) {
  if (/chartWrapper[\s\S]{0,120}hasChartData \?/.test(content)) return content;
  return content.replace(
    /(<View style=\{styles\.chartWrapper\}>\s*\n)(\s*<LineChart[\s\S]*?\/>)/,
    (match, wrapper, chart) =>
      `${wrapper}${EMPTY_CHART.replace('$CHART', chart.trimEnd())}`,
  );
}

function wrapChartCard(content) {
  if (/Chart Card[\s\S]{0,80}hasChartData &&/.test(content)) return content;
  if (/Chart Card[\s\S]{0,80}hasChartData \?/.test(content)) return content;
  return content.replace(
    /(\{\/\* Chart Card \*\/\}\s*\n)(\s*<View style=\{styles\.chartCard\}>[\s\S]*?\n\s*<\/View>\s*\n)(?=\s*\{\/\*|\s*<\/ScrollView>|\s*\{\/\* [A-Z])/,
    (match, comment, cardBlock) =>
      `${comment}{hasChartData ? (\n${cardBlock.trimEnd()}\n        ) : (\n          <View style={styles.emptyState}>\n            <Icon name="bar-chart-outline" size={64} color="#ccc" />\n            <Text style={styles.emptyText}>Belum ada data tersedia untuk grafik</Text>\n          </View>\n        )}\n`,
  );
}

function addEmptyStateForConditionalFiles(content) {
  if (content.includes('!hasChartData &&')) return content;
  if (!content.includes('last5Years.length > 0 &&')) return content;
  content = ensureHasChartData(content);
  return content.replace(
    /(<ScrollView[\s\S]*?showsVerticalScrollIndicator=\{false\}\s*\n\s*>)/,
    `$1${EMPTY_SCROLL}`,
  );
}

function fixArrayGuard(content, varName) {
  const bad = new RegExp(`const filteredData = ${varName}\\.filter`);
  if (bad.test(content)) {
    content = content.replace(
      bad,
      `const filteredData = (Array.isArray(${varName}) ? ${varName} : []).filter`,
    );
  }
  const badEarly = new RegExp(`if \\(!${varName} \\|\\| ${varName}\\.length === 0\\)`);
  if (badEarly.test(content)) {
    content = content.replace(
      badEarly,
      `if (!Array.isArray(${varName}) || ${varName}.length === 0)`,
    );
  }
  return content;
}

// Type A: standard chartWrapper files
const standardFiles = [
  'src/screens/ekonomi/KW/GrafikKW.js',
  'src/screens/sosial/IPM/GrafikIPM.js',
  'src/screens/sosial/PS/GrafikPS.js',
  'src/screens/sosial/RLS/GrafikRLS.js',
  'src/screens/sosial/IPG/GrafikIPG.js',
  'src/screens/sosial/HLS/GrafikHLS.js',
  'src/screens/sosial/masyMiskin/GrafikMasyMiskin.js',
];

for (const rel of standardFiles) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');
  content = ensureHasChartData(content);
  content = wrapChartWrapperLineChart(content);
  content = addEmptyStyles(content);
  if (rel.includes('RLS')) content = fixArrayGuard(content, 'dataLamaSekolah');
  if (rel.includes('HLS')) content = fixArrayGuard(content, 'dataAngkaHarapanLamaSekolah');
  if (rel.includes('masyMiskin')) content = fixArrayGuard(content, 'dataPenduduk');
  fs.writeFileSync(filePath, content);
  console.log('Standard:', rel);
}

// Type B: hasChartData exists, wrap chart card
const chartCardFiles = [
  'src/screens/kependudukan/JP/GrafikJP.js',
  'src/screens/kependudukan/JPBK/GrafikJPBK.js',
];

for (const rel of chartCardFiles) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('const hasChartData')) {
    content = rel.includes('JPBK')
      ? ensureHasChartData(content, 'latestYearData')
      : ensureHasChartData(content);
  }
  content = wrapChartCard(content);
  content = addEmptyStyles(content);
  fs.writeFileSync(filePath, content);
  console.log('ChartCard:', rel);
}

// Type C: last5Years.length > 0 conditional — add empty state + hasChartData alias
const conditionalFiles = [
  'src/screens/pertanian/JPP/GrafikJPP.js',
  'src/screens/pertanian/CPKH/GrafikCPKH.js',
  'src/screens/kependudukan/PP/GrafikPP.js',
  'src/screens/infrastruktur/prt/GrafikPRT.js',
  'src/screens/infrastruktur/PTKJ/GrafikPTKJ.js',
  'src/screens/infrastruktur/pjdd/GrafikPJDD.js',
  'src/screens/kependudukan/JPBKU/GrafikJPBKU.js',
];

for (const rel of conditionalFiles) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');
  content = addEmptyStateForConditionalFiles(content);
  content = addEmptyStyles(content);
  fs.writeFileSync(filePath, content);
  console.log('Conditional:', rel);
}
