import * as fs from 'node:fs';
import process from 'node:process';
import {describe, it} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;

chai.use(chaiHttp);

describe('app.yaml test', () => {
  it('generates correct app.yaml', () => {
    const path = process.env.TEST_DIR;
    const yaml = fs.readFileSync(path + '/build/app.yaml').toString().replaceAll('\r', '');

    expect(yaml).to.eq(fs.readFileSync('tests/expected_app.yaml').toString().replaceAll('\r', ''));
  });

  it('generates correct package.json', () => {
    const path = process.env.TEST_DIR;
    const packageJson = JSON.parse(fs.readFileSync(path + '/build/package.json').toString());
    const expectedJson = JSON.parse(fs.readFileSync('tests/expected_package.json').toString());

    expect(packageJson).to.deep.equal(expectedJson);
  });
});
