module.exports = {
  extends: ["eslint-config-prettier", "plugin:@typescript-eslint/recommended", "prettier"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.eslint.json"
  },

  plugins: ["prettier"],

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
    "arrow-parens": "error",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        endOfLine: "auto",
        bracketSameLine: true,
        printWidth: 120
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter"
      }
    ],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: ["signature", "private-static-field", "public-static-field", "field", "constructor", "method"]
      }
    ],
    "@typescript-eslint/no-floating-promises": ["error"],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false
        },
        extendDefaults: true
      }
    ]
  }
};
