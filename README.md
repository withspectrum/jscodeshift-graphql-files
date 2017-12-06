# `jscodeshift-graphql-files`

Transform a `.js` file with GraphQL tagged template literals into `.graphql` files.

## Example

This JSCodeshift turns this file:

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

## Usage

```sh
# Clone the repo
git clone git@github.com:withspectrum/jscodeshift-graphql-files
# Install jscodeshift globally
npm i -g jscodeshift

# Run jscodeshift with the transform on a directory
jscodeshift -t ./jscodeshift-graphql-files/index.js some-dir-with-graphql-types/
```

## License

Licensed under the MIT License, Copyright ©️ 2017 Maximilian Stoiber. See [LICENSE.md](LICENSE.md) for more information.
