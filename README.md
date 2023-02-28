# eslint-config-common

## About library
This EsLint library performs automated scans of your code files for common syntax and style errors. It reformats your code to ensure consistent rules for indentation, spacing, semicolons, single quotes vs double quotes, etc. This library extends ESlint rules from ESlint, Typescript, and Prettier and we can further add our own custom rules.

## Prerequisite / Peer Dependencies
This Eslint library has 2 peer dependencies. Make sure you have the below npm dependencies already in your project before installing this library.

```console
$ npm install eslint
$ npm install typescript
```
1-Install any version of Eslint and typescript which have a major version of at least  8 and 4 respectively.

## Installation Steps
Install the Eslint library using the below npm command.
```console
$ npm install eslint-gaurav-config-common
```

2-Make sure that IDE that you are using has an Eslint extension or plugin installed.
E.g. For VS-Code, install the official Eslint extension as shown in the screenshot attached.


3-Once the above plugin/extension is installed, ensure that the following settings are included in your IDE’s User/Project settings.
To open the VS-Code setting press Cntrl + shift + p  and the type and select Open User Settings (JSON) option.
In the setting.json file paste the following config at the root level of the JSON  if not already present-


```console
"eslint.format.enable": true,
    "eslint.options":{"resolvePluginsRelativeTo": "..."},
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": false,
        "source.organizeImports": true
    },
"eslint.validate": [
        "vue",
        "html",
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact"
]
```
These configs will auto-detect Eslint warnings and errors and will show quick fixes while coding in the IDE.

4- We assume the tsconfig.json file used for the Typescript config is already created. If not, create and use the required config for your project. No Eslint-related configuration will go inside the tsconfig.json file. But this file will be used by tsconfig.eslint.json which we will create in the next step

 5- At the root directory of your project create a tsconfig.eslint.json and include the following if not present already -

```console
 {
    "extends": "./tsconfig.json",
    "include": [
      "src",
      "test"
    ],
    "exclude": [
      "node_modules",
      "build",
      "lib",
    ]
  }
 ```
  This file defines which file to include and exclude for the typescript Eslint compiler. Include and excludes files according to your project.


  6- In the root directory of your project create a .eslintrc.js file and include the following config -

```console
require("./node_modules/@rushstack/eslint-patch/modern-module-resolution");
const rulesDirPlugin = require("./node_modules/eslint-plugin-rulesdir");
rulesDirPlugin.RULES_DIR = "node_modules/eslint-config-common/lib/rules/custom-rules";

module.exports = {
  extends: ["eslint-config-common/lib"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.eslint.json"]
  }
};
 ```
 The above configurations include the eslint-config-measured  library in the project.

Note: The reason we are using @rushstack/eslint-patch  to import the library is that this patch is a workaround for a longstanding Eslint bug that doesn’t allow a shared ESLint config to bring along its own plugins, rather than imposing dependencies on every consumer of the config.
The reason to require a Custom rules directory(line 2) is to allow a local directory containing the ESLint rules directory to be imported into the project.

7- In the root directory of your project create a .eslintignore file and add the following config. You can also add any file which you want to exclude from eslint
```console
.eslintrc.js
 ```

 8-In package.json add the following npm script which detects Eslint warnings and errors in CLI -
 ```console
 "lint": "node ./node_modules/eslint/bin/eslint -c .eslintrc.js 'src/**/*.ts'",
 ```
 Add the below npm script to detect and fix Eslint warnings and errors -
 ```console
 "lint:fix": "node ./node_modules/eslint/bin/eslint --fix -c .eslintrc.js 'src/**/*.ts'",
 ```
