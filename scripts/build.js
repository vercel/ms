#!/usr/bin/env node
// @ts-check
import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join, sep } from 'path';
import ts from 'typescript';

const DIR = './dist';

// Delete and recreate the output directory.
try {
  rmdirSync(DIR, { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
mkdirSync(DIR);

// Read the TypeScript config file.
const { config } = ts.readConfigFile('tsconfig.json', (fileName) =>
  readFileSync(fileName).toString(),
);

const sourceFile = join('src', 'index.ts');
// Build CommonJS module.
compile([sourceFile], { module: ts.ModuleKind.CommonJS });
// Build an ES2015 module and type declarations.
compile([sourceFile], {
  module: ts.ModuleKind.ES2020,
  declaration: true,
});

/**
 * Compiles files to JavaScript.
 *
 * @param {string[]} files
 * @param {ts.CompilerOptions} options
 */
function compile(files, options) {
  const compilerOptions = { ...config.compilerOptions, ...options };
  const host = ts.createCompilerHost(compilerOptions);

  host.writeFile = (fileName, contents) => {
    const isDts = fileName.endsWith('.d.ts');
    let path = join(DIR, fileName.split(sep)[1]);

    if (!isDts) {
      switch (compilerOptions.module) {
        case ts.ModuleKind.CommonJS: {
          // Adds backwards-compatibility for Node.js.
          // eslint-disable-next-line no-param-reassign
          contents += `module.exports = exports.default;\nmodule.exports.default = exports.default;\n`;
          // Use the .cjs file extension.
          path = path.replace(/\.js$/, '.cjs');
          break;
        }
        case ts.ModuleKind.ES2020: {
          // Use the .mjs file extension.
          path = path.replace(/\.js$/, '.mjs');
          break;
        }
        default:
          throw Error('Unhandled module type');
      }
    }

    writeFile(path, contents)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Built', path);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const program = ts.createProgram(files, compilerOptions, host);

  program.emit();
}
