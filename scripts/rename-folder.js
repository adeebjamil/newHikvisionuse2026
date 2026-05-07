const fs = require('fs');
const path = require('path');

const oldPath = path.join(__dirname, '..', 'app', 'products', '[category]');
const newPath = path.join(__dirname, '..', 'app', 'products', '[cat]');

if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log('Renamed successfully');
} else {
  console.log('Old path not found');
}
