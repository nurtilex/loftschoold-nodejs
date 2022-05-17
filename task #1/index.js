const path = require('path');
const fs = require('fs');

const _path = {
  src: path.join(__dirname, 'target'),
  target: path.join(__dirname, 'sorted')
};
function sortDirectory (base, target, removeBase = false) {
  fs.readdir(base, (error, files) => {
    files.forEach(file => {
      const currentFilePath = path.join(base, file);
      fs.stat(currentFilePath, (errors, stats) => {
        if (stats.isDirectory()) {
          sortDirectory(currentFilePath, target);
        }
        if (stats.isFile()) {
          if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
          }

          const currentFolderName = file[0].toUpperCase();
          const currentFolderPath = path.join(target, currentFolderName);
          if (!fs.existsSync(currentFolderPath)) {
            fs.mkdirSync(currentFolderPath);
          }
          const targetPath = path.join(target, currentFolderName, file);
          fs.copyFile(currentFilePath, targetPath, (err) => console.log(err));
        }
      });
    });
  });
  if (removeBase) {
    fs.rmdir(base, { recursive: true }, () => {});
  }
}

sortDirectory(_path.src, _path.target, false);
