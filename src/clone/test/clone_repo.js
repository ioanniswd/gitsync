"use strict";

const Promise = require('bluebird');

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

// console.log('__dirname:', __dirname);
const index = require('../index');
const clone_repo = new index().clone_repo;
const fs = Promise.promisifyAll(require('fs'));
const home = require('os').homedir();
const exec = Promise.promisify(require('child_process').exec, {
  multiArgs: true
});

// NOTE: You may need to increase the timeout, depending on your internet
// connection speed.

  let repo_1;
  let repo_2;
  let at;

  before(function(done) {
    this.timeout(15000);
    fs.readFileAsync(`${home}/.gitsync.json`, 'utf-8')
      .then(data => {
        data = JSON.parse(data);
        repo_1 = data.test_repo_1;
        repo_2 = data.test_repo_2;
        at = data.at;
        done();
      })
      .catch(err => {
        throw err;
      });
  });

  it('correct path', function() {
    this.timeout(15000);
    // console.log('repo_1:', repo_1);
    return expect(clone_repo(repo_1, at)).to.eventually.equal(`test/path/${repo_1.name}`);
  });

  it('wrong path', function() {
    this.timeout(15000);
    // console.log('repo_2:', repo_2);
    return expect(clone_repo(repo_2, at)).to.eventually.equal("");
  });

  after(function(done) {
    this.timeout(15000);
    exec('rm -R ./tmp')
      .spread(() => {
        // console.log('stdout:', stdout);
        // console.log('stderr:', stderr);
        // console.log('dirname:', __dirname);
        // console.log('process.cwd():', process.cwd());
        return exec(`rm -R ${process.cwd()}/test/path`);
      })
      .spread(() => {
        // console.log('stdout:', stdout);
        // console.log('stderr:', stderr);

        done();
      })
      .catch(err => {
        throw err;
      });
  });
