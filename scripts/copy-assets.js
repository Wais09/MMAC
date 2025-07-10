#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Copy public directory to .next/static
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Ensure .next/static directory exists
const staticDir = path.join(process.cwd(), '.next/static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copy uploads directory
const uploadsSource = path.join(process.cwd(), 'public/uploads');
const uploadsDestination = path.join(process.cwd(), '.next/static/uploads');

if (fs.existsSync(uploadsSource)) {
  console.log('📁 Copying uploads directory to .next/static/uploads...');
  copyRecursiveSync(uploadsSource, uploadsDestination);
  console.log('✅ Successfully copied uploads directory');

  // List copied files
  const files = fs.readdirSync(uploadsDestination);
  console.log(`📄 Copied ${files.length} files:`, files.slice(0, 5).join(', ') + (files.length > 5 ? '...' : ''));
} else {
  console.log('❌ uploads directory not found at:', uploadsSource);
}

// Also copy to public directory in .next for direct access
const publicDestination = path.join(process.cwd(), '.next/public');
if (!fs.existsSync(publicDestination)) {
  fs.mkdirSync(publicDestination, { recursive: true });
}

const publicUploadsDestination = path.join(publicDestination, 'uploads');
console.log('📁 Copying uploads to .next/public/uploads...');
copyRecursiveSync(uploadsSource, publicUploadsDestination);
console.log('✅ Successfully copied uploads to public directory');
