#!/usr/bin/env node
// @ts-check
import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import ts from 'typescript';

const DIR = './lib';

// Delete and recreate the ouptut directory.
rmdirSync(DIR, { recursive: true });
mkdirSync(DIR);

// Read the TypeScript config file.
const { config } = ts.readConfigFile('./tsconfig.json', (fileName) =>
  readFileSync(fileName).toString(),
);

// Build CommonJS module.
compile(['./index.ts'], { module: ts.ModuleKind.CommonJS });
// Build an ES2015 module and type declarations.
compile(['./index.ts'], { module: ts.ModuleKind.ES2015, declaration: true });

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
    let path = join(DIR, fileName);

    if (!isDts) {
      switch (compilerOptions.module) {
        case ts.ModuleKind.CommonJS:
          // Adds backwards-compatibilty for Node.js.
          contents += 'module.exports = exports.default;\n';
          // Use the .cjs file extension.
          path = path.replace(/\.js$/, '.cjs');
          break;
        case ts.ModuleKind.ES2015:
          // Use the .mjs file extension.
          path = path.replace(/\.js$/, '.mjs');
          break;
        default:
          throw Error('Unhandled module type');
      }
    }

    writeFile(path, contents)
      .then(() => {
        console.log('Built', path);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const program = ts.createProgram(files, compilerOptions, host);

  program.emit();
}
