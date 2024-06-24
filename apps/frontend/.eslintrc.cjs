module.exports = {
  extends: ['plugin:effector/recommended'],
  plugins: ['react-refresh', 'effector'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
