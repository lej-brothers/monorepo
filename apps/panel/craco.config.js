const fs = require("fs");
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];

const appDirectory = fs.realpathSync(process.cwd());

packages.push(path.join(appDirectory, "../../packages/queries"));
packages.push(path.join(appDirectory, "../../packages/common"));

module.exports = {
  plugins: [],
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
  },
};
