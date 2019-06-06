#!/usr/bin/env node

var Command = require('commander').Command
var program = new Command('tap-summary')

program
  .version(require('../package.json').version)
  .option('--no-ansi', 'Disable ANSI formatting.')
  .option('--no-stack', 'Disable error stack trace.')
  .option('--no-progress', 'Disable progress output during tests.')
  .option('--no-duration', 'Disable duration calculation for tests.')
  .parse(process.argv)

var reporter = require('..')({
  ansi: program.ansi,
  progress: program.progress,
  stack: program.stack,
  duration: program.duration,
})

process.stdin
  .pipe(reporter)
  .pipe(process.stdout)

process.on('exit', function (status) {
  if (status === 1) {
    process.exit(1)
  }
  if (reporter.failed) {
    process.exit(1)
  }
})
