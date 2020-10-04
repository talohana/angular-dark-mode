module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { tag: 'docs', release: 'patch' },
          { tag: 'chore', release: 'patch' },
          { tag: 'refactor', release: 'patch' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/git',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/ngx-storage-api',
      },
    ],
  ],
};
