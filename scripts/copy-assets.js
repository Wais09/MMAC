#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Copy public directory recursively
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
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('🚀 Starting asset copy process for Netlify deployment...');

// Ensure .next directory exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log('⚠️ .next directory not found - build may not have completed');
  process.exit(0);
}

// Copy entire public directory to .next/public for Netlify
const publicSource = path.join(process.cwd(), 'public');
const publicDestination = path.join(process.cwd(), '.next/public');

if (fs.existsSync(publicSource)) {
  console.log('📁 Copying entire public directory to .next/public...');
  copyRecursiveSync(publicSource, publicDestination);
  console.log('✅ Successfully copied public directory');

  // Specifically verify uploads directory
  const uploadsDestination = path.join(publicDestination, 'uploads');
  if (fs.existsSync(uploadsDestination)) {
    const files = fs.readdirSync(uploadsDestination);
    console.log(`📄 Uploads directory contains ${files.length} files:`, files.slice(0, 8).join(', ') + (files.length > 8 ? '...' : ''));
  }
} else {
  console.log('❌ public directory not found at:', publicSource);
}

// Also copy to .next/static for additional backup
const staticDir = path.join(process.cwd(), '.next/static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copy uploads directory to static as well
const uploadsSource = path.join(process.cwd(), 'public/uploads');
const staticUploadsDestination = path.join(staticDir, 'uploads');

if (fs.existsSync(uploadsSource)) {
  console.log('📁 Copying uploads to .next/static/uploads...');
  copyRecursiveSync(uploadsSource, staticUploadsDestination);
  console.log('✅ Successfully copied uploads to static directory');
} else {
  console.log('❌ uploads directory not found at:', uploadsSource);
}

console.log('🎉 Asset copying completed successfully!')
