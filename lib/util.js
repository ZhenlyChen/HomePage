const path = require("path");
const fs = require("fs-extra");

const copyFile = function (srcPath, tarPath, filter) {
  fs.readdir(srcPath, function (err, files) {
    if (err === null) {
      files.forEach(function (filename) {
        let fileDir = path.join(srcPath, filename);
        fs.stat(fileDir, async function (errs, stats) {
          let isFile = stats.isFile();
          if (isFile) {
            // 复制文件
            let srcPath = fileDir;
            if (filter) {
              srcPath = await filter(fileDir);
            }
            fs.copyFile(
              srcPath,
              path.join(tarPath, path.basename(srcPath)),
              (err) => {}
            );
          } else {
            // 创建文件夹
            let tarFileDir = path.join(tarPath, filename);
            fs.mkdir(tarFileDir, (err) => {});
            copyFile(fileDir, tarFileDir, filter); // 递归
          }
        });
      });
    } else {
      if (err) console.error(err);
    }
  });
};

module.exports = {
  copyFile: copyFile,
};
