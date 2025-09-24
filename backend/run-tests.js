#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Starting P2P.help Backend Tests...\n');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET_KEY = 'test-secret-key-for-testing';

const testProcess = spawn('npm', ['test'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

testProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ All tests passed successfully!');
  } else {
    console.log('\n❌ Some tests failed. Exit code:', code);
  }
  process.exit(code);
});

testProcess.on('error', (error) => {
  console.error('❌ Error running tests:', error);
  process.exit(1);
});
