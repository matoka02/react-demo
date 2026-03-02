// import { satisfies } from 'semver';
// import { engines } from './package.json';

// const version = engines.node;
// if (!satisfies(process.version, version)) {
//   console.log(
//     `Required node version ${version} not satisfied with current version ${process.version}.`
//   );
//   process.exit(1);
// }

import { readFileSync } from 'fs';
import { satisfies } from 'semver';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));
const version = pkg.engines.node;

if (!satisfies(process.version, version)) {
  console.log(
    `Required node version ${version} not satisfied with current version ${process.version}.`
  );
  process.exit(1);
}
