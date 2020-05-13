const chokidar = require("chokidar");
const build = require("../lib/build");
const fs = require("fs-extra");
const liveServer = require("live-server");

const configWatcher = chokidar.watch("./config.json", {
  persistent: true,
});

let themeName = "";
let themeWatcher = null;

const loadTheme = async (config) => {
  if (config.theme !== themeName) {
    if (themeWatcher) {
      await themeWatcher.close();
    }
    themeName = config.theme;
    console.log("load theme " + themeName);
    themeWatcher = chokidar.watch("./themes/" + themeName, {
      persistent: true,
      ignoreInitial: true,
    });
    themeWatcher.on("all", (event, path) => {
      console.log(event, path);
      build.make();
      //server.notify.apply(server, [path]);
    });
  }
  build.make();
  //server.notify.apply(server, ["./dist"]);
};

configWatcher.on("change", async (path) => {
  console.log("change", path);
  config = fs.readJSONSync("./config.json");
  await loadTheme(config);
});

loadTheme(fs.readJSONSync("./config.json")).then(() => {});

liveServer.start({
  port: 8888, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./dist", // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  logLevel: 0,
});
