module.exports = {
  rules: {
    semi: ["error", "always"],
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true
      }
    ],
    "no-console": [
      "error",
      {
        allow: ["error"]
      }
    ],
    "max-classes-per-file": "off",
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never"
      }
    ],
    "object-literal-sort-keys": "off",
    "arrow-parens": "error"
  }
};
