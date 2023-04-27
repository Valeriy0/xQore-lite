module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-indent-props': 0,
    'react/no-children-prop': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-closing-bracket-location': 0,
    'react-hooks/rules-of-hooks': 'warn',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': 'warn',
    'no-param-reassign': 'off',
    'no-extra-boolean-cast': 'off',
    'no-unused-vars': 'off',
  },
  settings: {
    'import/resolver': {
      node: { paths: ['src'] },
    },
  },
};
