const gulp = require('gulp');
const ts = require('gulp-typescript');
const spawn = require('child_process').spawn;
const argv = require('yargs').argv;

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copy-data', function () {
  return gulp.src('./src/data/*.json')
    .pipe(gulp.dest('./dist/data'));
});

gulp.task('watch', ['copy-data', 'scripts'], () => {
  gulp.watch('src/data/*.json', ['copy-data']);
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('data-import', function () {
  var isProduction = (argv.production === undefined && argv.prod === undefined) ? false : true;
  var isDevelopment = (argv.development === undefined && argv.dev === undefined) ? false : true;

  // clone the actual env vars to avoid overrides
  var env = Object.create(process.env);
  if (isProduction)
    env.NODE_ENV = 'production';
  else if (isDevelopment)
    env.NODE_ENV = 'development';

  spawn('node', ['dist/data/dataImporter.js'], { stdio: 'inherit', env: env });
});

gulp.task('build', ['copy-data', 'scripts']);

gulp.task('default', ['watch']);