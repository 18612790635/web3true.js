/* jshint ignore:start */
Package.describe({
  name: 'truechain:web3t',
  version: '1.1.8',
  summary: 'Truechain JavaScript API wrapper repository',
  git: 'https://github.com/truechain/web3true.js',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

// Npm.depends({
//     "xmlhttprequest": "1.7.0"
// });


Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');

  api.addFiles('dist/web3t.js', ['client']); // 'server'
});

/* jshint ignore:end */
