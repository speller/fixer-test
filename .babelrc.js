module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      targets: { esmodules: true },
    }],
    ["@babel/preset-react"]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ],
}
