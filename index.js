const fs = require('fs');

// Check if a node has a GraphQL comment
const hasGraphQLComment = node =>
  node.comments &&
  node.comments.length > 0 &&
  node.comments.every(
    comment =>
      comment.value.trim().toLowerCase() === 'graphql' ||
      comment.value.trim().toLowerCase() === 'gql'
  );

// Create a GraphQL file with the contents of a node at some path
const createGraphQLFile = (path, node, { dry }) => {
  if (node.value.quasis.length > 1)
    throw new Error(
      `[GraphQL Files] GraphQL Template Literal at line ${node.value.quasis[0]
        .loc.start.line} has interpolations, (at line ${node.value.quasis[0].loc
        .end.line}?) aborting.`
    );

  const { value: { raw } } = node.value.quasis[0];
  if (dry) {
    console.log(`[GraphQL Files] Would create ${path}.`);
    return;
  }
  fs.writeFileSync(path, raw);
};

module.exports = (fileInfo, api, options) => {
  const { source, path } = fileInfo;
  const filePath = path.replace(/\.js$/, '.graphql');

  // Find all template literals that have a graphql comment
  const nodes = api
    .jscodeshift(source)
    .find('TemplateLiteral', hasGraphQLComment);

  // If there's none, bail out early
  if (nodes.length === 0) return;
  if (options.dry) {
    console.log(`[GraphQL Files] Found GraphQL template literals in ${path}.`);
  }
  // If there's one, just output it at file.graphql
  if (nodes.length === 1) {
    nodes.forEach(node => createGraphQLFile(filePath, node, options));
    return;
  }

  // If there's multiple we have to output file-0.graphql, file-1.graphql etc
  nodes.forEach((node, index) => {
    createGraphQLFile(
      filePath.replace(/\.graphql$/, `-${index}.graphql`),
      node,
      options
    );
  });
  return;
};
