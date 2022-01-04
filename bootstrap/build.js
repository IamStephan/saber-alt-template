const fs = require("fs");
const resolve = require("path").resolve;
const join = require("path").join;
const cp = require("child_process");

// get library path
const lib = resolve(__dirname, "../lib/");

function buildLib() {
  fs.readdirSync(lib).forEach(function (mod) {
    const modPath = join(lib, mod);

    // ensure path has package.json
    if (!fs.existsSync(join(modPath, "package.json"))) {
      return;
    }

    try {
      // install folder
      cp.spawn("yarn", ["build"], {
        env: process.env,
        cwd: modPath,
        stdio: "inherit",
      });
    } catch (e) {
      console.log(e);
    }
  });
}

buildLib();
