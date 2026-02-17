#!/bin/bash

# Script to push to production with IS_PROD flag enabled

echo "Setting IS_PROD to true..."

# Change IS_PROD to true in constants.ts
sed -i.bak 's/export const IS_PROD = false;/export const IS_PROD = true;/' src/lib/constants.ts

# Stage the change
git add src/lib/constants.ts

# Commit the change
git commit -m "Set IS_PROD to true for production deployment"

echo "Pushing to pipa-web dev..."
git push pipa-web main:dev

echo "Reverting IS_PROD back to false..."

# Revert the change
sed -i.bak 's/export const IS_PROD = true;/export const IS_PROD = false;/' src/lib/constants.ts

# Stage the revert
git add src/lib/constants.ts

# Commit the revert
git commit -m "Revert IS_PROD to false after deployment"

# Clean up backup file
rm -f src/lib/constants.ts.bak

echo "Done! IS_PROD has been toggled for production and reverted."