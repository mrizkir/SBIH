const fs = require('fs')
const path = require('path')

const gradlePath = path.join(__dirname, '../android/app/build.gradle')
const outPath = path.join(__dirname, '../src/constants/AppVersion.js')

const content = fs.readFileSync(gradlePath, 'utf8')
const match = content.match(/versionName\s+"([^"]+)"/)
const version = match ? match[1] : '0.0.0'

const fileContent = `// Auto-generated from android/app/build.gradle (versionName). Do not edit manually.
// Run: yarn sync-version
export const APP_VERSION = '${version}'
`

fs.writeFileSync(outPath, fileContent)
console.log(`App version synced: ${version}`)
