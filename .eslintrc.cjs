module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: {
    project: 'tsconfig.json',
  },
  ignorePatterns: ['dist/**'],
  overrides: [
    {
      files: ['**/*.test.ts'],
      extends: [require.resolve('@vercel/style-guide/eslint/jest')],
    },
  ],
};
