import * as mdx from 'eslint-plugin-mdx';

export default [
  {
    ignores: ['node_modules/**', 'build/**', '.docusaurus/**'],
  },
  {
    ...mdx.flat,
  },
  {
    ...mdx.flatCodeBlocks,
  },
];
