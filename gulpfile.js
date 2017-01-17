const gulp = require('gulp');
const ts = require('gulp-typescript');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copy-data', function() {
  return gulp.src('./src/data/*.json')
    .pipe(gulp.dest('./dist/data'));
});

gulp.task('watch', ['copy-data', 'scripts'], () => {
  gulp.watch('src/data/*.json', ['copy-data']);
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('build', ['copy-data', 'scripts']);

gulp.task('default', ['watch']);