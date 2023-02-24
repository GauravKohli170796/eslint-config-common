require("@rushstack/eslint-config/profile/node");
module.exports = {
	globals: {
		MyGlobal: true
	},

	parserOptions: {
		ecmaVersion: "latest"
	},

	parser: "@typescript-eslint/parser",

	plugins: ["eslint-plugin-prettier", "@typescript-eslint", "rulesdir", "prettier"],
	env: {
		es6: true
	},
	rules: {
		"rulesdir/no-emoji-in-string": "error"
	},
	extends: [
		"eslint-config-prettier",
		"./rules/eslint-rules",
		"./rules/prettier-rules",
		"./rules/typescript-rules",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	]
};
