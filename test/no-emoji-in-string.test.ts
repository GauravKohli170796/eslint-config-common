import { RuleTester } from "eslint";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noEmojiInString = require("../rules/custom-rules/no-emoji-in-string");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    souceType: "module",
    node: true,
    browser: true
  }
});

ruleTester.run("Testing no-emoji-in-string rule", noEmojiInString, {
  valid: [{ code: "const fizz = 'hello'" }, { code: "const buzz='a spaced string with number - 21212'" }],
  invalid: [
    {
      code: "const emojiString ='hello - 🤔'",
      errors: [{ messageId: "emojiInStringNotAllowed" }]
    }
  ]
});
