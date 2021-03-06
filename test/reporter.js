var test = require('tape')
var reporter = require('../lib/reporter')
var fs = require('fs')
var path = require('path')
var fixtures = path.resolve.bind(path, __dirname, 'fixtures')

test('reporter, summary', function (t) {
  fs.createReadStream(fixtures('summary.tap'))
    .pipe(reporter())
    .on('summary', function (summary) {
      t.equal(summary.planned, 3, 'planned')
      t.equal(summary.assertions, 3, 'assertions')
      t.equal(summary.pass, 3, 'pass')
      t.equal(summary.fail, 0, 'fail')
      t.equal(summary.comments, 0, 'comments')
      t.end()
    })
})

test('reporter, summary, unnamed', function (t) {
  fs.createReadStream(fixtures('summary.unnamed.tap'))
    .pipe(reporter())
    .on('summary', function (summary) {
      t.equal(summary.planned, 3, 'planned')
      t.equal(summary.assertions, 3, 'assertions')
      t.equal(summary.pass, 3, 'pass')
      t.equal(summary.fail, 0, 'fail')
      t.equal(summary.comments, 0, 'comments')
      t.end()
    })
})

test('reporter, fail', function (t) {
  fs.createReadStream(fixtures('fail.tap'))
    .pipe(reporter())
    .on('summary', function (summary, fails) {
      t.equal(summary.planned, 4, 'planned')
      t.equal(summary.assertions, 4, 'assertions')
      t.equal(summary.pass, 2, 'pass')
      t.equal(summary.fail, 2, 'fail')
      t.equal(summary.comments, 0, 'comments')
      t.same(Object.keys(fails), ['fail', 'pass and fail'])
      t.end()
    })
})

test('reporter, comment', function (t) {
  fs.createReadStream(fixtures('comment.tap'))
    .pipe(reporter())
    .on('summary', function (summary, fails, comments) {
      t.equal(summary.planned, 2, 'planned')
      t.equal(summary.assertions, 2, 'assertions')
      t.equal(summary.pass, 2, 'pass')
      t.equal(summary.fail, 0, 'fail')
      t.equal(summary.comments, 2, 'comments')

      t.same(Object.keys(comments), ['sync', 'async'])
      t.same(comments.sync, ['Hello, '])
      t.same(comments.async, ['world!'])
      t.end()
    })
})

