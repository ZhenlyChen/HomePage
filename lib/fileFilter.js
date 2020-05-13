const path = require("path");
const less = require("less");
const fs = require("fs-extra");

module.exports = {
  deal: async function (filePath) {
    let finalPath = filePath;
    const fileType = path.extname(filePath);
    if (fileType === ".less") {
      const content = fs.readFileSync(filePath);
      try {
        const res = await less.render(content.toString());
        const tmpPath = "./tmp";
        fs.ensureDirSync(tmpPath);
        fileName = path.basename(filePath);
        finalPath =
          tmpPath + "/" + fileName.substr(0, fileName.indexOf(".")) + ".css";
        fs.writeFileSync(finalPath, res.css);
      } catch (err) {
        console.error("解析less文件失败");
        throw err;
      }
    }
    return finalPath;
  },
};
