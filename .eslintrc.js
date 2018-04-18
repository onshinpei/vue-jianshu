// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        "indent": ["error", 4],
        "semi": 0,
        // 配置末尾逗号
        "comma-dangle": ['error', {
            "array": 'never',
            "object": 'ignore',
            "function": 'ignore'
        }],
        'spaced-comment': 0,
        'no-unused-vars': 0,
        'space-before-function-paren': 0,
        'generator-star-spacing': 'off',
        //单双引号
        'quotes': 0,
        //末尾逗号
        'comma-dangle': 0,
        'no-multiple-empty-lines': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
