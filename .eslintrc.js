module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  rules: {
    "import/no-anonymous-default-export": "off",
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
