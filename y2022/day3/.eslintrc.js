module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:solid/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:solid/recommended',
        'standard-with-typescript'
      ],
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'solid'
  ],
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {}
}
