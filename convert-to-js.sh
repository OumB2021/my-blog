#!/bin/bash

echo "🚀 Starting TypeScript to JavaScript conversion for your Next.js project..."

# 1. Remove TypeScript dependencies
echo "🗑️ Removing TypeScript dependencies..."
npm uninstall typescript @types/node @types/react @types/react-dom

# 2. Rename TypeScript files to JavaScript
echo "🔄 Renaming TypeScript files to JavaScript..."
find . -name "*.ts" -exec bash -c 'mv "$0" "${0%.ts}.js"' {} \;
find . -name "*.tsx" -exec bash -c 'mv "$0" "${0%.tsx}.jsx"' {} \;

# 3. Delete tsconfig.json
if [ -f tsconfig.json ]; then
  echo "🗑️ Deleting tsconfig.json..."
  rm tsconfig.json
fi

# 4. Update package.json scripts (remove TypeScript references)
echo "🛠️ Updating package.json scripts..."
jq '.scripts |= with_entries(select(.key | test("tsc") | not))' package.json > temp.json && mv temp.json package.json

# 5. Remove TypeScript rules from ESLint if present
if [ -f .eslintrc.json ]; then
  echo "🛠️ Updating ESLint config..."
  jq 'del(.extends[] | select(. == "plugin:@typescript-eslint/recommended"))' .eslintrc.json > temp.json && mv temp.json .eslintrc.json
fi

# 6. Clean up any remaining @types dependencies
echo "🗑️ Removing leftover @types dependencies..."
npm list | grep '@types/' | awk '{print $2}' | cut -d@ -f1 | xargs npm uninstall

# 7. Run Next.js dev server to check if everything works
echo "🚀 Running Next.js to verify migration..."
npm run dev

echo "✅ TypeScript has been removed. Your Next.js project is now JavaScript-based!"
