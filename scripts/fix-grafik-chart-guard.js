#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const files = [
  'src/screens/sosial/AHH/GrafikAHH.js',
  'src/screens/sosial/PKK/GrafikPKK.js',
  'src/screens/sosial/IDB/GrafikIDB.js',
  'src/screens/sosial/AKHB/GrafikAKHB.js',
  'src/screens/ekonomi/LI/GrafikLI.js',
  'src/screens/sosial/IPGG/GrafikIPGG.js',
  'src/screens/ekonomi/PE/GrafikPE.js',
  'src/screens/ekonomi/PMA/GrafikPMA.js',
  'src/screens/sosial/APM/GrafikAPM.js',
  'src/screens/sosial/IG/GrafikIG.js',
  'src/screens/sosial/JRTLH/GrafikJRTLH.js',
  'src/screens/sosial/AKIM/GrafikAKIM.js',
  'src/screens/pertanian/CPKUP/GrafikCPKUP.js',
  'src/screens/sosial/APK/GrafikAPK.js',
  'src/screens/pertanian/PPT/GrafikPPT.js',
];

const root = path.join(__dirname, '..');

for (const rel of files) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('hasChartData ? (\n            <LineChart')) continue;

  content = content.replace(
    /(<View style=\{styles\.chartWrapper\}>\s*\n)(\s*<LineChart)/,
    `$1$2`.replace('$2', '{hasChartData ? (\n            <LineChart'),
  );

  // Fix the broken replace above - do it properly
  content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /(<View style=\{styles\.chartWrapper\}>\s*\n)(\s*<LineChart[\s\S]*?\/>)/,
    `$1{hasChartData ? (
$2
            ) : (
              <View style={styles.emptyState}>
                <Icon name="bar-chart-outline" size={64} color="#ccc" />
                <Text style={styles.emptyText}>Belum ada data tersedia untuk grafik</Text>
              </View>
            )}`,
  );

  if (!content.includes('emptyState:')) {
    content = content.replace(
      /scrollContent: \{\s*\n\s*padding: 16,/,
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
  scrollContent: {
    padding: 16,`,
    );
  }

  fs.writeFileSync(filePath, content);
  console.log('Chart guard:', rel);
}
