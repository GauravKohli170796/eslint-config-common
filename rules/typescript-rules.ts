module.exports = {
	rules: {
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
