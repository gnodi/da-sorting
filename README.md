da-sorting
==========

JavaScript/Node.js helper package for sorting things.

Testing
-------

### Create a GIT repository

Create a GIT repository initialized with:
- a file `package.json` to define your project and its dependencies:
```json
{}
```
- a file `.travis.yml` to define :
```yml
sudo: false
language: node_js
node_js:
  - '6.0'
  - node
script: npm test
addons:
  sauce_connect:
    username:
```

These files are basic example and may be customized.

### Encrypt your Sauce Labs access key

Install travis CLI to encrypt your Saucelabs access key:
https://github.com/travis-ci/travis.rb#installation

Follow the steps describe on this page to encrypt your Saucelabs access key:
https://docs.travis-ci.com/user/jwt