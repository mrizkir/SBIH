#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, '../src/screens/DetailDashboard');
const files = fs.readdirSync(dashboardDir).filter((f) => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dashboardDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('createMaterialTopTabNavigator')) continue;
  if (content.includes('lazy: true')) continue;

  content = content.replace(
    'screenOptions={materialTopTabScreenOptions}',
    'screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}',
  );
  content = content.replace(
    /screenOptions=\{\{\s*\.\.\.materialTopTabScreenOptions,\s*lazy: true,\s*lazy: true\s*\}\}/,
    'screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}',
  );

  fs.writeFileSync(filePath, content);
  console.log('Updated dashboard:', file);
}

// Also fix DashboardAnggaranMurni if it uses tabs
const anggaranPath = path.join(__dirname, '../src/screens/e-money/DashboardAnggaranMurni.js');
if (fs.existsSync(anggaranPath)) {
  let content = fs.readFileSync(anggaranPath, 'utf8');
  if (content.includes('createMaterialTopTabNavigator') && !content.includes('lazy: true')) {
    if (!content.includes('lazy: true')) {
      content = content.replace(
        'screenOptions={materialTopTabScreenOptions}',
        'screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}',
      );
    }
    fs.writeFileSync(anggaranPath, content);
    console.log('Updated dashboard: DashboardAnggaranMurni.js');
  }
}
