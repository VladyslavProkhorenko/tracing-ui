module.exports = {
    root: true,
    env: {
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    rules: {
        "no-unused-vars": "error",
        "no-unused-expressions": "error",
        "no-unreachable": "error",
        "no-else-return": "error",
        "no-empty-function": "error",
        indent: ["warn", 4],
        quotes: ["warn", "double"],
    },
    overrides: [
        {
            files: ["**/*.jsx"], 
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    ],
};
