import { satisfies } from 'semver';
import { engines } from './package.json';

const version = engines.node;
if (!satisfies(process.version, version)) {
  console.log(
    `Required node version ${version} not satisfied with current version ${process.version}.`
  );
  process.exit(1);
}
