/**
 * build
 * copy src files to output path
 */

const Gulp = require('gulp');
const Path = require('path');
const Merge = require('merge2');
const Log = require('fancy-log');
const Rename = require('gulp-rename');
const Ts = require('gulp-typescript');
const Webpack = require('webpack');

Gulp.task('build', async function () {
  const env = require('../env')();

  // build esm
  const TsProject = Ts.createProject(Path.join(env.rootPath, 'tsconfig.json'), {
    declaration: true,
    declarationFiles: true,
    module: 'esnext',
    target: 'esnext'
  });
  const tsResult = await Gulp.src([Path.resolve(env.srcPath, 'img-compressor.ts')]).pipe(TsProject());
  Merge([tsResult.dts.pipe(Gulp.dest(env.outputPath)), tsResult.js.pipe(Gulp.dest(env.outputPath))]);

  // build command.js
  const TsProjectCMD = Ts.createProject(Path.join(env.rootPath, 'tsconfig.json'), {
    declarationFiles: false,
    module: 'commonjs',
    target: 'esnext'
  });
  const tsResultCMD = await Gulp.src([Path.resolve(env.srcPath, 'img-compressor.ts')]).pipe(TsProjectCMD());
  Merge([
    tsResultCMD.js
      .pipe(
        Rename(function (path) {
          path.basename += '.cmd';
        })
      )
      .pipe(Gulp.dest(env.outputPath))
  ]);

  // build umd.js
  await runWebpack(
    {
      mode: 'production',
      entry: Path.join(env.srcPath, 'img-compressor.ts'),
      context: env.srcPath,
      output: {
        path: env.outputPath,
        chunkFilename: 'img-compressor.chunk.umd.js',
        filename: 'img-compressor.umd.js',
        library: 'ImgCompressor',
        libraryTarget: 'umd'
      },
      module: {
        rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
      },
      resolve: {
        extensions: ['.js', '.ts']
      },
      plugins: []
    },
    true
  );

  // copy other files to output
  await Gulp.src([Path.resolve(env.srcPath, 'types.ts'), Path.resolve(env.srcPath, 'lib/**/*')], {
    base: Path.resolve(env.srcPath)
  }).pipe(Gulp.dest(env.outputPath));

  // copy npm publish files to output
  await Gulp.src(['package.json', 'README.md'].map((x) => Path.join(env.rootPath, x))).pipe(Gulp.dest(env.outputPath));
});

function runWebpack(options, isLog = false) {
  return new Promise(function (resolve, reject) {
    Webpack(options, (err, stats) => {
      if (err || (stats && stats.compilation && stats.compilation.errors && stats.compilation.errors.length)) {
        if (!err) {
          err = stats.compilation.errors[0];
        }
        reject(err);
        // throw new PluginError('webpack', err);
      } else {
        if (isLog) {
          Log('[webpack]', stats.toString({ colors: true }));
        }
        resolve(stats);
      }
    });
  });
}
