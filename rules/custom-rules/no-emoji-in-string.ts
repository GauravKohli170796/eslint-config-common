module.exports = {
	meta: {
		messages: {
			emojiInStringNotAllowed: "Please Do not use Emojis in string"
		}
	},
	create: (context) => {
		return {
			VariableDeclaration: (node) => {
				if (node.declarations[0]?.init?.type === "Literal") {
					const value = node.declarations[0].init?.value.match(/\p{Extended_Pictographic}/gu);
					if (Array.isArray(value) && value.length > 0) {
						context.report({
							node: node,
							messageId: "emojiInStringNotAllowed"
						});
					}
				}
			}
		};
	}
};
