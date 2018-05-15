// IMPORTS
var sass = require('node-sass')
var path = require('path')
var fs = require('fs')

// VARIABLES
var inPath = path.join(__dirname, '..', 'src', 'antimatter.scss')
var outPath = path.join(__dirname, '..', 'dist', 'antimatter.css')

// HELPER
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

const log = function (str = '--------------------') {
  console.log()
  console.log(str)
}

var buildDark = function () {
  // VARIABLES
  var inPathDark = path.join(__dirname, '..', 'src', 'antimatter_dark.scss')
  var outPathDark = path.join(__dirname, '..', 'dist', 'antimatter_dark.css')

  // BUILD
  log()
  log('# Building dark css')
  var result = sass.render({
    file: inPathDark,
    outFile: outPathDark
  }, function (err, out) {
    if (err) throw err

    mkdirSync(path.join(outPathDark, '..'))

    fs.writeFileSync(outPathDark, out.css)

    log('--> Build Done.')
  })
}

// BUILD
log()
log('# Building css')
var result = sass.render({
  file: inPath,
  outFile: outPath
}, function (err, out) {
  if (err) throw err

  mkdirSync(path.join(outPath, '..'))

  fs.writeFileSync(outPath, out.css)

  log('--> Build Done.')

  buildDark()
})
