module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(commit) => commit.includes("Merge pull request")],
  rules: {
    "header-max-length": [2, "always", 100],
  },
};
