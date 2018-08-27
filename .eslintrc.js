module.exports = {
    root: true,
    env: {
        node: true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}