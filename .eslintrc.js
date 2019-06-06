module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'prettier/prettier': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': ['off', { allow: ['warn', 'error'] }],
    'no-restricted-imports': [
      'off',
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
