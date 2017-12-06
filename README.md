# `jscodeshift-graphql-files`

Transform a `.js` file with GraphQL tagged template literals into `.graphql` files.

## Example

This codemod turns this file:

```javascript
// User.js
const User = /* GraphQL */`
  type User {
    id: ID!
  }
`
```

Into this `.graphql` file:

```graphql
# User.graphql
type User {
  id: ID!
}
```

> Note: It does so indistructively, it doesn't touch the original `.js` files at all. :warning: It will override an existing User.graphql file though!

## Usage

```sh
# Clone the repo
git clone git@github.com:withspectrum/jscodeshift-graphql-files
# Install jscodeshift globally
npm i -g jscodeshift

# Run jscodeshift with the transform on a directory
# Note the --dry option, this means we'll only log which files would be output
jscodeshift -t ./jscodeshift-graphql-files/index.js some-dir-with-graphql-types/ --dry
# If you're happy with the resulting files do a real run without the --dry option!
```

## License

Licensed under the MIT License, Copyright ©️ 2017 Maximilian Stoiber. See [LICENSE.md](LICENSE.md) for more information.
