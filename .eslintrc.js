module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'prettier/prettier': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'styled-components',
            message: 'Please import from styled-components/macro.'
          }
        ],
        patterns: ['!styled-components/macro']
      }
    ]
  }
}
