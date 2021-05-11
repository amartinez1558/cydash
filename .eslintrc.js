// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require('fs');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'graphql'],
  rules: {
    ignorePatterns: ['nexus-typgens.ts'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'graphql/template-strings': [
      'error',
      {
        // Import default settings for your GraphQL client. Supported values:
        // "apollo", "relay", "lokka", "fraql", "literal"
        env: 'apollo',

        // Import your schema JSON here
        schemaString: fs.readFileSync('./src/schema.graphql', 'utf8'),

        tagName: 'gql',

        // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
        // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

        // OR provide the schema in the Schema Language format
        // schemaString: printSchema(schema),

        // tagName is set automatically
      },
    ],
  },
};
