const ejs = require("ejs");
const fs = require("fs-extra");
const util = require("../lib/util");
const fileFilter = require("../lib/fileFilter");

module.exports = {
  make: function () {
    const config = fs.readJsonSync("./config.json");
    // 读取主题语言文件
    config.text = fs.readJSONSync(
      "./themes/" + config.theme + "/language/" + config.language + ".json"
    );
    // 读取主题默认配置
    config.data = Object.assign(
      fs.readJSONSync("./themes/" + config.theme + "/config.json"),
      config.data
    );

    // 处理资源文件
    util.copyFile(
      "./themes/" + config.theme + "/resources",
      "./dist",
      fileFilter.deal
    );

    util.copyFile("./resources", "./dist", fileFilter.deal);

    // 编译模板
    ejs.renderFile(
      "./themes/" + config.theme + "/layout/index.ejs",
      config,
      {},
      function (err, str) {
        if (err) {
          console.error("生成失败：");
          console.error(err);
        } else {
          const distPath = "./dist";
          fs.emptyDirSync(distPath);
          fs.writeFileSync("./dist/index.html", str);
        }
      }
    );
  },
};
